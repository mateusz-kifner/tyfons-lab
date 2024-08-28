interface PageProps {
  params: {
    message: string;
  };
}

export default async function Page({ params }: PageProps) {
  return <>{params.message}</>;
}
