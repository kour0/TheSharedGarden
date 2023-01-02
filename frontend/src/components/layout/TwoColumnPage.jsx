import MainPage from "./MainPage";

export default function TwoColumnPage({ children, title, subtitle }) {

    const primaryColumn = children[0];
    const secondaryColumn = children[1];

    return (
        <div className="flex flex-1 items-stretch overflow-hidden">
            <main className="flex-1 h-screen">
                {/* Primary column */}
                <section aria-labelledby="primary-heading">
                    <MainPage title={title} subtitle={subtitle}>
                        <div className="flex h-full min-w-0 flex-1 flex-col lg:order-last">
                            {primaryColumn}
                        </div>
                    </MainPage>

                    {/* Your content */}
                </section>
            </main>

            {/* Secondary column (hidden on smaller screens) */}
            <aside className="hidden w-64 overflow-y-auto border-l p-4 border-gray-200 bg-white lg:block">
                {/* Your content */}
                {secondaryColumn}
            </aside>
        </div>
    );
}



