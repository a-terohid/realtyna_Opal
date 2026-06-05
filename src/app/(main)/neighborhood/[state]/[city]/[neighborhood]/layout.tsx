import Header from "@/components/HomeContainer/Header/Header"

export default async function Layout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      {children}
    </>
  )
}
