import { SubmitButton } from "./SubmitButton";

export default function Form({ onSubmit, children, title, subTitle, submitIsLoading }) {

    return (<form className="space-y-8 divide-y divide-gray-200" onSubmit={onSubmit}>
        <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
            <div className="space-y-6 pt-8 sm:space-y-5 sm:pt-10">
                <div>
                    <h3 className="text-lg font-medium leading-6 text-gray-900">{title}</h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">{subTitle}</p>
                </div>
                <div className="space-y-6 sm:space-y-5">
                    {children}
                </div>
            </div>
        </div>

        <div className="pt-5">
            <div className="flex justify-end">
                <button
                    type="button"
                    className="rounded-md border border-gray-300 bg-white py-2 px-4 mr-3 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-2"
                >
                    Annuler
                </button>
                < SubmitButton isLoading={submitIsLoading} />
            </div>
        </div>
    </form>
    );
}