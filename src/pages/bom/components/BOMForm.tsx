import { useForm, useFieldArray } from 'react-hook-form';
import { Plus, Minus } from 'lucide-react';
import Button from '../../../components/ui/Button';
import TextField from '../../../components/ui/TextField';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const bomSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  version: z.string().min(1, 'Version is required'),
  yieldQuantity: z.number().min(0.01, 'Yield quantity must be greater than 0'),
  yieldUnit: z.string().min(1, 'Yield unit is required'),
  ingredients: z.array(z.object({
    inventoryItemId: z.string().uuid('Invalid inventory item'),
    quantity: z.number().min(0.01, 'Quantity must be greater than 0'),
    unit: z.string().min(1, 'Unit is required'),
    type: z.enum(['ingredient', 'packaging']),
  })),
});

type BOMFormData = z.infer<typeof bomSchema>;

interface BOMFormProps {
  initialData?: BOMFormData;
  onSubmit: (data: BOMFormData) => void;
  onCancel: () => void;
}

const BOMForm = ({ initialData, onSubmit, onCancel }: BOMFormProps) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<BOMFormData>({
    resolver: zodResolver(bomSchema),
    defaultValues: initialData || {
      ingredients: [{ type: 'ingredient' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'ingredients',
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TextField
          label="Name"
          error={errors.name?.message}
          {...register('name')}
        />
        <TextField
          label="Version"
          error={errors.version?.message}
          {...register('version')}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TextField
          label="Yield Quantity"
          type="number"
          step="0.01"
          error={errors.yieldQuantity?.message}
          {...register('yieldQuantity', { valueAsNumber: true })}
        />
        <TextField
          label="Yield Unit"
          error={errors.yieldUnit?.message}
          {...register('yieldUnit')}
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">Ingredients</h3>
          <Button
            type="button"
            variant="outline"
            onClick={() => append({ type: 'ingredient' })}
          >
            <Plus size={16} className="mr-2" />
            Add Ingredient
          </Button>
        </div>

        {fields.map((field, index) => (
          <div key={field.id} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border rounded-md">
            <TextField
              label="Inventory Item"
              error={errors.ingredients?.[index]?.inventoryItemId?.message}
              {...register(`ingredients.${index}.inventoryItemId`)}
            />
            <TextField
              label="Quantity"
              type="number"
              step="0.01"
              error={errors.ingredients?.[index]?.quantity?.message}
              {...register(`ingredients.${index}.quantity`, { valueAsNumber: true })}
            />
            <TextField
              label="Unit"
              error={errors.ingredients?.[index]?.unit?.message}
              {...register(`ingredients.${index}.unit`)}
            />
            <div className="flex items-end">
              <Button
                type="button"
                variant="outline"
                className="text-error-600 hover:text-error-700"
                onClick={() => remove(index)}
              >
                <Minus size={16} className="mr-2" />
                Remove
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" isLoading={isSubmitting}>
          Save BOM
        </Button>
      </div>
    </form>
  );
};

export default BOMForm;