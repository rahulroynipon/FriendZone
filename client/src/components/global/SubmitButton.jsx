import cn from "../../lib/utils";

export const SubmitButton = ({ isLoading, children }) => {
  const variant = {
    base: "w-full px-6 py-2.5 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 rounded-lg",
    primary:
      "bg-blue-600 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50",

    disabled: "bg-blue-400 cursor-not-allowed",
  };

  return (
    <button
      type="submit"
      disabled={isLoading}
      className={cn(
        variant.base,
        isLoading ? variant.disabled : variant.primary
      )}
    >
      {isLoading ? (
        <p className="flex items-center justify-center gap-2">
          <span className="loading loading-spinner loading-sm"></span>
          <span>Please wait...</span>
        </p>
      ) : (
        children
      )}
    </button>
  );
};
