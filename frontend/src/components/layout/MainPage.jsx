import PageHeader from "../PageHeader";

export default function MainPage({ children, title, subtitle }) {
    return (
        <div className="relative px-4 pb-4 sm:px-6 lg:px-8 lg:pb-8">

            <div className="relative pt-3 lg:pt-8 mx-auto max-w-7xl">
                <PageHeader title={title} subtitle={subtitle} />
                {children}
            </div>
        </div>
    );
}