import React from 'react';
import { useController, useFormContext } from 'react-hook-form';

export default React.memo(function PassengerListItem({ index, isActive, setActive, remove }) {
    const { control } = useFormContext();
    const {
        field: { value: fullName = '' },
    } = useController({
        name: `passengers.${index}.fullName`,
        control,
        defaultValue: '',
    });

    const isFilled = fullName.trim().length > 0;

    const initials = isFilled
        ? fullName
            .split(' ')
            .map((w) => w[0])
            .join('')
            .toUpperCase()
        : 'A';

    return (
        <div
            onClick={() => setActive(index)}
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '8px',
                border: isActive ? '2px solid #4B27FE' : '1px solid #ccc',
                borderRadius: '5px',
                marginBottom: '4px',
                cursor: 'pointer',
            }}
        >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexGrow: 1 }}>
                <div
                    style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        background: '#ddd',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    {initials}
                </div>
                <div>
                    <div style={{ fontWeight: 500 }}>
                        {isFilled ? fullName : `Passenger ${index + 1}`}
                    </div>
                    {!isFilled && (
                        <div style={{ color: '#888', fontSize: '12px' }}>
                            Add the passenger details
                        </div>
                    )}
                </div>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
                <button
                    type="button"
                    aria-label="edit passenger"
                    onClick={(e) => { e.stopPropagation(); setActive(index); }}
                    style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                >
                    ✏️
                </button>
                <button
                    type="button"
                    aria-label="delete passenger"
                    onClick={(e) => { e.stopPropagation(); remove(index); }}
                    style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                >
                    🗑️
                </button>
            </div>
        </div>
    );
});

