import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

import { type GlobalConcurrencyLimit } from "@/hooks/global-concurrency-limits";
import { useCreateOrEditLimitDialog } from "./use-create-or-edit-limit-dialog";

type Props = {
	limitToUpdate: undefined | GlobalConcurrencyLimit;
	onOpenChange: (open: boolean) => void;
	onSubmit: () => void;
	open: boolean;
};

export const CreateOrEditLimitDialog = ({
	limitToUpdate,
	onOpenChange,
	onSubmit,
	open,
}: Props) => {
	const { dialogTitle, form, isLoading, saveOrUpdate } =
		useCreateOrEditLimitDialog({
			limitToUpdate,
			onSubmit,
		});

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{dialogTitle}</DialogTitle>
				</DialogHeader>

				<Form {...form}>
					<form
						onSubmit={(e) => void form.handleSubmit(saveOrUpdate)(e)}
						className="space-y-4"
					>
						<FormMessage>{form.formState.errors.root?.message}</FormMessage>
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input type="text" autoComplete="off" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="limit"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Concurrency Limit</FormLabel>
									<FormControl>
										<Input type="number" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="slot_decay_per_second"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Slot Decay Per Second</FormLabel>
									<FormControl>
										<Input type="number" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="active"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Active</FormLabel>
									<FormControl>
										<Switch
											className="block"
											checked={field.value}
											onCheckedChange={field.onChange}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<DialogFooter>
							<DialogTrigger asChild>
								<Button variant="outline">Close</Button>
							</DialogTrigger>
							<Button type="submit" loading={isLoading}>
								{limitToUpdate ? "Update" : "Save"}
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};
