export type Turmas = {
    id: number,
    name: string,
    description: string | null;
    category: string,
    unit: string,
    unit_name: string,
    schedules: Schedule[];
}

interface Schedule {
    day: string;
}
