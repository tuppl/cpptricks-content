import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const DOCS_DIR = join(import.meta.dir, "..", "docs");

const LANGUAGES = ["cpp"];
const DIFFICULTIES = ["beginner", "intermediate", "advanced"];
const STANDARDS = ["C++98", "C++03", "C++11", "C++14", "C++17", "C++20", "C++23", "C++26"];
const FIELDS = ["title", "description", "language", "difficulty", "tags", "example", "authors"];
const REQUIRED = FIELDS.filter((field) => field !== "tags");

type Problem = { file: string; line: number; message: string };

const problems: Problem[] = [];

function report(file: string, line: number, message: string) {
    problems.push({ file, line, message });
}

function lineOf(text: string, index: number) {
    return text.slice(0, index).split("\n").length;
}

function isNonEmptyString(value: unknown): value is string {
    return typeof value === "string" && value.trim() !== "";
}

function validateFrontmatter(file: string, data: Record<string, unknown>, fieldLine: (key: string) => number) {
    for (const key of Object.keys(data)) {
        if (!FIELDS.includes(key)) {
            report(file, fieldLine(key), `unknown field "${key}"`);
        }
    }

    for (const key of REQUIRED) {
        if (!(key in data)) {
            report(file, 1, `missing field "${key}"`);
        }
    }

    for (const key of ["title", "description", "example"]) {
        if (key in data && !isNonEmptyString(data[key])) {
            report(file, fieldLine(key), `"${key}" must be a non-empty string`);
        }
    }

    if ("language" in data && !LANGUAGES.includes(data.language as string)) {
        report(file, fieldLine("language"), `"language" must be one of: ${LANGUAGES.join(", ")}`);
    }

    if ("difficulty" in data && !DIFFICULTIES.includes(data.difficulty as string)) {
        report(file, fieldLine("difficulty"), `"difficulty" must be one of: ${DIFFICULTIES.join(", ")}`);
    }

    if ("tags" in data) {
        const tags = data.tags;
        if (!Array.isArray(tags) || !tags.every(isNonEmptyString)) {
            report(file, fieldLine("tags"), `"tags" must be a list of non-empty strings`);
        } else if (new Set(tags).size !== tags.length) {
            report(file, fieldLine("tags"), `"tags" contains duplicates`);
        }
    }

    if ("authors" in data) {
        const authors = data.authors;
        const valid =
            Array.isArray(authors) &&
            authors.length > 0 &&
            authors.every(
                (author) =>
                    typeof author === "object" &&
                    author !== null &&
                    isNonEmptyString((author as Record<string, unknown>).name) &&
                    isNonEmptyString((author as Record<string, unknown>).github),
            );
        if (!valid) {
            report(file, fieldLine("authors"), `"authors" must be a non-empty list of { name, github }`);
        }
    }
}

function validateBody(file: string, text: string, bodyStart: number, slugs: Set<string>) {
    const body = text.slice(bodyStart);
    const directives = [...body.matchAll(/^:{3,}version(\{[^}\n]*\})?/gm)];

    if (directives.length === 0) {
        report(file, lineOf(text, bodyStart), `no :::version block, so the post has no versions`);
    }

    for (const directive of directives) {
        const line = lineOf(text, bodyStart + directive.index);
        const std = directive[1]?.match(/std="([^"]*)"/)?.[1];
        if (std === undefined) {
            report(file, line, `version block is missing std="..."`);
        } else if (!STANDARDS.includes(std)) {
            report(file, line, `unknown standard "${std}", expected one of: ${STANDARDS.join(", ")}`);
        }
    }

    for (const link of body.matchAll(/\]\(\/collection\/([^)#?\s]+)/g)) {
        if (!slugs.has(link[1])) {
            report(file, lineOf(text, bodyStart + link.index), `link to /collection/${link[1]}, which doesn't exist`);
        }
    }
}

function validateFile(file: string, slugs: Set<string>) {
    if (!/^[a-z0-9]+(-[a-z0-9]+)*\.md$/.test(file)) {
        report(file, 1, `filename must be kebab-case, e.g. "move-constructor.md"`);
    }

    const text = readFileSync(join(DOCS_DIR, file), "utf8");
    const match = text.match(/^---\n([\s\S]*?)\n---\n/);
    if (!match) {
        report(file, 1, `missing frontmatter between --- lines at the top of the file`);
        return;
    }

    let data: unknown;
    try {
        data = Bun.YAML.parse(match[1]);
    } catch (error) {
        report(file, 2, `frontmatter isn't valid YAML: ${(error as Error).message}`);
        return;
    }

    if (typeof data !== "object" || data === null || Array.isArray(data)) {
        report(file, 2, `frontmatter must be a set of key: value fields`);
        return;
    }

    const fieldLine = (key: string) => {
        const index = match[1].search(new RegExp(`^${key}:`, "m"));
        return index === -1 ? 1 : lineOf(match[1], index) + 1;
    };

    validateFrontmatter(file, data as Record<string, unknown>, fieldLine);
    validateBody(file, text, match[0].length, slugs);
}

const entries = readdirSync(DOCS_DIR, { withFileTypes: true });
const files = entries.filter((entry) => entry.isFile() && entry.name.endsWith(".md")).map((entry) => entry.name).sort();
const slugs = new Set(files.map((file) => file.slice(0, -3)));

for (const entry of entries) {
    if (!entry.isFile() || !entry.name.endsWith(".md")) {
        report(entry.name, 1, `only .md files belong in docs/`);
    }
}

for (const file of files) {
    validateFile(file, slugs);
}

if (problems.length > 0) {
    problems.sort((a, b) => a.file.localeCompare(b.file) || a.line - b.line);
    for (const { file, line, message } of problems) {
        console.error(`docs/${file}:${line}: ${message}`);
    }
    const count = new Set(problems.map((problem) => problem.file)).size;
    console.error(`\n${problems.length} problem${problems.length === 1 ? "" : "s"} in ${count} file${count === 1 ? "" : "s"}.`);
    process.exit(1);
}

console.log(`Checked ${files.length} posts. No problems found.`);
