import clsx from 'clsx';
import React, { ReactElement } from 'react';

type ItemDetailsProps = React.HTMLAttributes<HTMLDivElement> & {
    item: any;
    includeKeys?: string[];
    showKey?: boolean;
};

const ItemDetails: React.FC<ItemDetailsProps> = ({ item, includeKeys, showKey = false, ...props }) => {
    
    const renderDetails = (item: any, keyPrefix: string = '', index: number = 0): React.JSX.Element | null => {
            if (typeof item !== 'object' || item === null) {
                return <span>{String(item)}</span>;
            }
            if (Array.isArray(item)) {
                console.log('array', index);
                return (
                    <ul >
                        {item.map((subItem, _index) => (
                            <li className={`ml-[20px]`} key={`${keyPrefix}-${_index}`}>
                                { renderDetails(subItem, `${keyPrefix}-${index}`, _index) }
                            </li>
                        ))}
                    </ul>
                );
            }
            if(typeof item === 'object') {
                const objectsAsJSX = Object.entries(item).map(([key, value]) => {
                    if(includeKeys && includeKeys.includes(key)) {
                        return (
                            <div key={`${keyPrefix}-${key}`}>
                                {showKey && <strong>{key}:</strong>} {renderDetails(value, `${keyPrefix}-${key}`)}
                            </div>
                        )
                    }
                    return null
                })
             return (
                <div>
                    { objectsAsJSX }
                </div>
                );
            }
            else return null
    };

    return <div className={clsx(props.className && props.className, !props.className && 'bg-gray-500')} {...props}>{renderDetails(item)}</div>;
};

export default ItemDetails;