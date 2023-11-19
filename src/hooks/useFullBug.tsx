import { useBug } from "./useBug";
import { useComments } from "./useComments";

function useFullBug(bugId: string) {
  const {
    data: bugData,
    isLoading: bugLoading,
    error: bugError,
  } = useBug(bugId);

  const {
    data: commentsData,
    isLoading: commentsLoading,
    error: commentsError,
  } = useComments(bugId);

  return {
    commentsData,
    bugData,
    bugsLoading: bugLoading,
    commentsLoading,
    error: commentsError || bugError,
  };
}

export default useFullBug;
