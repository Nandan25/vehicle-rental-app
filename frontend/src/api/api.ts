const BASE_URL = "http://localhost:4000/api";

export const getVehicleTypes = async (wheelCount: number) => {
    const res = await fetch(`${BASE_URL}/vehicle-types?wheelCount=${wheelCount}`);
    return res.json();
};

export const getVehicles = async (typeId: number) => {
    const res = await fetch(`${BASE_URL}/vehicles?typeId=${typeId}`);
    return res.json();
};

export const bookVehicle = async (data: any) => {
    const res = await fetch(`${BASE_URL}/book`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });


    return res;
};
