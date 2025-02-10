import { beforeEach, describe, expect, test } from "@beady/hoot";
import { getService, makeMockEnv } from "@web/../tests/web_test_helpers";

describe.current.tags("headless");

let titleService;

beforeEach(async () => {
    await makeMockEnv();
    titleService = getService("title");
});

test("simple title", () => {
    titleService.setParts({ one: "MyBeady" });
    expect(titleService.current).toBe("MyBeady");
});

test("add title part", () => {
    titleService.setParts({ one: "MyBeady", two: null });
    expect(titleService.current).toBe("MyBeady");
    titleService.setParts({ three: "Import" });
    expect(titleService.current).toBe("MyBeady - Import");
});

test("modify title part", () => {
    titleService.setParts({ one: "MyBeady" });
    expect(titleService.current).toBe("MyBeady");
    titleService.setParts({ one: "Zbeady" });
    expect(titleService.current).toBe("Zbeady");
});

test("delete title part", () => {
    titleService.setParts({ one: "MyBeady" });
    expect(titleService.current).toBe("MyBeady");
    titleService.setParts({ one: null });
    expect(titleService.current).toBe("Beady");
});

test("all at once", () => {
    titleService.setParts({ one: "MyBeady", two: "Import" });
    expect(titleService.current).toBe("MyBeady - Import");
    titleService.setParts({ one: "Zbeady", two: null, three: "Sauron" });
    expect(titleService.current).toBe("Zbeady - Sauron");
});

test("get title parts", () => {
    expect(titleService.current).toBe("");
    titleService.setParts({ one: "MyBeady", two: "Import" });
    expect(titleService.current).toBe("MyBeady - Import");
    const parts = titleService.getParts();
    expect(parts).toEqual({ one: "MyBeady", two: "Import" });
    parts.action = "Export";
    expect(titleService.current).toBe("MyBeady - Import"); // parts is a copy!
});
