interface Props {
  nugId: string;
  currentUserImg: string;
  currentUserId: string;
}

const Comment = ({ nugId, currentUserImg, currentUserId }: Props) => {
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col justify-start gap-10"
      >
        <FormField
          control={form.control}
          name="nug"
          render={({ field }) => (
            <FormItem className="flex flex-col w-full gap-3">
              <FormLabel className="mt-10 text-base-semibold text-light-2">
                Content
              </FormLabel>
              <FormControl className="no-focus border border-dark-4 bg-dark-3 text-light-1">
                <Textarea rows={15} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="bg-primary-500">
          Post Nug
        </Button>
      </form>
    </Form>
  );
};

export default Comment;
