import { useState } from 'react';

function useForm(inputValues: any) {
    const [values, setValues] = useState(inputValues);

    const handleChange = (event: React.SyntheticEvent) => {
        const { value, name } = event.target as unknown as {
            value: string;
            name: string;
        };
        setValues({ ...values, [name]: value });
    };
    return { values, handleChange, setValues };
}

export default useForm;
