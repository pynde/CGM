import { createFileRoute } from '@tanstack/react-router'
import ActionDesigner from '@/components/ActionDesigner/ActionDesigner';
import { TYPES_AS_STRING } from '@/shared/enums/enums';
import { ActionType } from '@/shared/types/types';
import { useSelectionTypeGuarded } from '@/zustand/SelectionStore';

export const Route = createFileRoute('/designer/actions/')({
  component: RouteComponent,
})

function RouteComponent() {
      const selected = useSelectionTypeGuarded<ActionType>(TYPES_AS_STRING.ACTION);
    if(!selected) return null;
    return <ActionDesigner selectedAction={selected} />;
}
