export const Page = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="page p-4 bg-white m-2 shadow rounded-2xl">{children}</div>
  );
};
