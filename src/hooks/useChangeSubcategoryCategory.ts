import { QUERY_KEY_CATEGORIES, QUERY_KEY_SUBCATEGORIES } from '@/library';
import type { Subcategory } from '@/model/Category';
import { changeSubcategoryCategory } from '@/service/CategoryHttpService';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type ChangeSubcategoryCategoryPayload = {
    subCategoryId: number;
    categoryId: number;
};

export const useChangeSubcategoryCategory = () => {
    const queryClient = useQueryClient();

    return useMutation<Subcategory, Error, ChangeSubcategoryCategoryPayload>({
        mutationFn: ({ subCategoryId, categoryId }) =>
            changeSubcategoryCategory(subCategoryId, categoryId),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY_SUBCATEGORIES],
            });

            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY_CATEGORIES],
            });
        },

        onError: (error) => {
            console.error(error);
        },
    });
};
