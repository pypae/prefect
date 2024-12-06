import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabOptions } from "@/routes/concurrency-limits";
import { getRouteApi } from "@tanstack/react-router";

const routeApi = getRouteApi("/concurrency-limits");

/** Maps url tab option to visual name */
const TAB_OPTIONS: Record<TabOptions, TabOptions> = {
	Global: "Global",
	"Task Run": "Task Run",
} as const;

type Props = {
	globalView: React.ReactNode;
	taskRunView: React.ReactNode;
};

// TODO: Move Tabs for navigation to a generic styled component

export const ConcurrencyTabs = ({
	globalView,
	taskRunView,
}: Props): JSX.Element => {
	const { tab } = routeApi.useSearch();
	const navigate = routeApi.useNavigate();

	return (
		<Tabs defaultValue="Global" value={tab}>
			<TabsList className="grid w-full grid-cols-2">
				<TabsTrigger
					value={TAB_OPTIONS.Global}
					onClick={() => {
						void navigate({
							to: "/concurrency-limits",
							search: (prev) => ({ ...prev, tab: TAB_OPTIONS.Global }),
						});
					}}
				>
					{TAB_OPTIONS.Global}
				</TabsTrigger>

				<TabsTrigger
					value={TAB_OPTIONS["Task Run"]}
					onClick={() => {
						void navigate({
							to: "/concurrency-limits",
							search: (prev) => ({ ...prev, tab: TAB_OPTIONS["Task Run"] }),
						});
					}}
				>
					{TAB_OPTIONS["Task Run"]}
				</TabsTrigger>
			</TabsList>
			<TabsContent value={TAB_OPTIONS.Global}>{globalView}</TabsContent>
			<TabsContent value={TAB_OPTIONS["Task Run"]}>{taskRunView}</TabsContent>
		</Tabs>
	);
};
