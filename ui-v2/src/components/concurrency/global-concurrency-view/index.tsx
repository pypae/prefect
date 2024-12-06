import { useListGlobalConcurrencyLimits } from "@/hooks/global-concurrency-limits";
import { useMemo, useState } from "react";
import { CreateOrEditLimitDialog } from "./create-or-edit-limit-dialog";
import { GlobalConcurrencyLimitEmptyState } from "./global-concurrency-limit-empty-state";
import { GlobalConcurrencyLimitsHeader } from "./global-concurrency-limits-header";

type AddOrEditDialogState = {
	open: boolean;
	limitIdToEdit?: string;
};

export const GlobalConcurrencyView = () => {
	const [openAddOrEditDialog, setOpenAddOrEditDialog] =
		useState<AddOrEditDialogState>({
			open: false,
		});

	const { data } = useListGlobalConcurrencyLimits();

	const selectedlimitToUpdate = useMemo(() => {
		if (!openAddOrEditDialog.limitIdToEdit) {
			return undefined;
		}
		return data.find((limit) => limit.id === openAddOrEditDialog.limitIdToEdit);
	}, [data, openAddOrEditDialog.limitIdToEdit]);

	const openAddDialog = () =>
		setOpenAddOrEditDialog((curr) => ({ ...curr, open: true }));

	// close and deselect any selected limits
	const closeAddDialog = () => setOpenAddOrEditDialog({ open: false });

	return (
		<>
			{data.length === 0 ? (
				<GlobalConcurrencyLimitEmptyState onAdd={openAddDialog} />
			) : (
				<div className="flex flex-col gap-2">
					<GlobalConcurrencyLimitsHeader onAdd={openAddDialog} />
					<div>TODO</div>
					<ul>
						{data.map((limit) => (
							<li key={limit.id}>{JSON.stringify(limit)}</li>
						))}
					</ul>
				</div>
			)}
			<CreateOrEditLimitDialog
				open={openAddOrEditDialog.open}
				onOpenChange={(open) =>
					setOpenAddOrEditDialog((curr) => ({ ...curr, open }))
				}
				limitToUpdate={selectedlimitToUpdate}
				onSubmit={closeAddDialog}
			/>
		</>
	);
};
