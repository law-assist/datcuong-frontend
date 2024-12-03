import SearchList from "./components/Search";
import SearchBreadcrumb from "./components/SearchBreadcrumb";
import SearchFilter from "./components/SearchFilter";

/* eslint-disable @typescript-eslint/no-unused-vars */
type SearchPageProps = {
    searchParams: {
        q: string;
        page: string;
    };
};

const SearchPage = async ({ searchParams }: SearchPageProps) => {
    return (
        <div className="mx-auto py-4 flex-grow w-full" id="search-page">
            <div className="gap-1 flex flex-col lg:flex-row">
                <div className="flex-grow bg-white py-2 rounded-xl">
                    <SearchBreadcrumb />
                    <SearchList />
                </div>
                <div className="order-first lg:order-last justify-items-end lg:min-w-72">
                    <SearchFilter />
                </div>
            </div>
        </div>
    );
};

export default SearchPage;
