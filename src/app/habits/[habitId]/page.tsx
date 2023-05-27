const Page = (props: { params: { habitId: string } }) => {
  return <div>Habit ID {props.params.habitId}</div>;
};

export default Page;
