import Navigation from "@/components/Navigation";
import ChakraContainer from "@/components/ChakraContainer";
import ApolloContainer from "@/components/ApolloContainer";
import RecoilRootContainer from "@/components/RecoilRootContainer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ChakraContainer>
          <RecoilRootContainer>
            <ApolloContainer>
              <Navigation />
              {children}
            </ApolloContainer>
          </RecoilRootContainer>
        </ChakraContainer>
      </body>
    </html>
  );
}
