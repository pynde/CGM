import React, { useEffect, useState } from 'react';
import * as Collapsible from "@radix-ui/react-collapsible";
import { ActionType, GameComponentType, ResourceType, VisualType } from '@shared/types/types';



type VisualsProps = {
    item: Partial<VisualType>;
    onUpdate: (item: Partial<VisualType>) => void;
};

const Visuals: React.FC<VisualsProps> = ({ item, onUpdate }) => {
    const [imgUrls, setImgUrls] = useState<string[]>(item.imgUrls || []);
    const [width, setWidth] = useState(item.width || 0);
    const [height, setHeight] = useState(item.height || 0);
    const [opened, setOpened] = useState(true);

    useEffect(() => {
        setImgUrls(item.imgUrls || []);
        setWidth(item.width || 0);
        setHeight(item.height || 0);
    }, [item]);

    const handleImageUrlChange = (index: number, value: string) => {
        const newImgUrls = [...imgUrls];
        if (index === newImgUrls.length) {
            newImgUrls.push(value);
        } else {
            newImgUrls[index] = value;
        }
        setImgUrls(newImgUrls);
    };

    const handleUpdate = () => {
        const updatedItem = {
            ...item,
            ...(imgUrls.length > 0 && { imgUrls }),
            ...(width > 0 && { width }),
            ...(height > 0 && { height }),
        };
        onUpdate(updatedItem);
    };

    return (
        <Collapsible.Root
            open={opened}
            onOpenChange={setOpened}
            >
            <Collapsible.Trigger className="py-2">
            {opened ? 'Hide Visuals' : 'Show Visuals'}
            </Collapsible.Trigger>
            <Collapsible.Content className="text-gray-200">
            <div className="flex flex-col space-y-4">
                {[0, 1].map((index) => (
                <div key={index}>
                    <label className="block text-sm font-medium">
                    {index === 0 ? 'Front Image URL' : 'Back Image URL'}
                    </label>
                    <input
                    type="text"
                    value={imgUrls[index] || ''}
                    onChange={(e) => handleImageUrlChange(index, e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                    />
                </div>
                ))}
                <div>
                <label className="block text-sm font-medium">Width</label>
                <input
                    type="number"
                    value={width || ''}
                    onChange={(e) => setWidth(e.target.value ? Number(e.target.value) : 0)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                />
                </div>
                <div>
                <label className="block text-sm font-medium">Height</label>
                <input
                    type="number"
                    value={height || ''}
                    onChange={(e) => setHeight(e.target.value ? Number(e.target.value) : 0)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                />
                </div>
                <button
                onClick={handleUpdate}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                Update
                </button>
            </div>
            </Collapsible.Content>
        </Collapsible.Root>
    );
};

export default Visuals;