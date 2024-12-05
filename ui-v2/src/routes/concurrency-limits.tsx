import { ConcurrencyPage } from "@/components/concurrency/concurrency-page";
import { useListGlobalConcurrencyLimits } from "@/hooks/global-concurrency-limits";
import { createFileRoute } from "@tanstack/react-router";
import { zodSearchValidator } from "@tanstack/router-zod-adapter";
import { z } from "zod";

/**
 * Schema for validating URL search parameters for the Concurrency Limits page.
 * @property {'Global' | 'Task_Run'} tab used designate which tab view to display
 */
const searchParams = z
	.object({
		tab: z.enum(["Global", "Task Run"]).default("Global"),
	})
	.strict();

export type TabOptions = z.infer<typeof searchParams>["tab"];

export const Route = createFileRoute("/concurrency-limits")({
	validateSearch: zodSearchValidator(searchParams),
	component: ConcurrencyPage,
	wrapInSuspense: true,
	loader: useListGlobalConcurrencyLimits.loader,
});
