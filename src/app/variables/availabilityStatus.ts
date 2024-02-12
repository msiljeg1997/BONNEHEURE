import { SelectItem } from "primeng/api";

export class AvailabilityStatusVar {
    public static AVAILABILITY_STATUSES: SelectItem[] = [
        { label: 'Na zalihi',              value: 'available' },
        { label: '5 do 10 dana',           value: 'partially_available' },
        { label: 'Nedostupno',             value: 'unavailable' },
    ];
}