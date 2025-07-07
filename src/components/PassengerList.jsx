import React from 'react';
import { useDeferredValue } from 'react';
import PassengerListItem from './PassengerListItem';

export default React.memo(function PassengerList({ fields, activeIndex, setActive, remove }) {
    // defer this so React knows it's lower-priority
    const deferredActive = useDeferredValue(activeIndex);

    return (
        <div>
            {fields.length > 0 && (
                <div style={{ margin: '8px 0', fontSize: '16px', fontWeight: 600 }}>
                    Who’s travelling?
                </div>
            )}
            {fields.map((item, i) => (
                <PassengerListItem
                    key={item.id}
                    index={i}
                    isActive={deferredActive === i}
                    setActive={setActive}
                    remove={remove}
                />
            ))}
        </div>
    );
});







