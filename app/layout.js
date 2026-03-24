export const metadata = {
  title: "SiparişDefterim - Instagram Sipariş Yönetimi",
  description: "Instagram DM'den siparış yönetin",
}

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body style={{ margin: 0, padding: 0 }}>
        {children}
      </body>
    </html>
  )
}