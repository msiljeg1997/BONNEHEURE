export class APIResponse<T> {
    status!: string;
    message!: string;
    data!: T
}

/**
 * USER
 */
export class User {
    id?: number;
    username?: string;
    email?: string;
    phone_no?: string;
    first_name?: string;
    last_name?: string;
    company_name?: string;
    password?: string;
    confirm_password?: string;
    role_id?: number;
    role_name?: string;
    discount_percentage?: number;
}

/**
 * PRODUCT
 */
export class Product {
    id?: number;
    name?: string;
    description?: string;
    category_id?: number;
    featured?: boolean;
    price_eur?: number;
    price_hrk?: number;
    disabled?: boolean;
    category_description?: string;
    detailed_description?: string;
    preview_image_name?: string;
    preview_image_alt_text?: string;
    discount_percentage?: number;
    discount_price_hrk?: number;
    discount_price_eur?: number;
    unit_of_measure?: string;
    availability_status?: string;
    table_view_variant?: boolean;

    selected_variant?: ProductVariant;
    variant_exists?: boolean;

    variants?: ProductVariant[];
    images?: ProductImage[];

    public getPriceEur(): number {
        if (this.variantExists()) {
            return this.selected_variant!.price_eur ?? 0;
        } else {
            return this.price_eur ?? 0;
        }
    }

    public getDiscountPriceEur(): number {
        if (this.variantExists()) {
            if (this.table_view_variant) {
                return 0;
            }
            return this.selected_variant!.discount_price_eur ?? 0;
        } else {
            return this.discount_price_eur ?? 0;
        }
    }

    public getPriceHrk(): number {
        if (this.variantExists()) {
            return this.selected_variant!.price_hrk ?? 0;
        } else {
            return this.price_hrk ?? 0;
        }
    }

    public getDiscountPriceHrk(): number {
        if (this.variantExists()) {
            return this.selected_variant!.discount_price_hrk ?? 0;
        } else {
            return this.discount_price_hrk ?? 0;
        }
    }

    public getDiscountPercentage(): number {
        if (this.variantExists()) {
            return this.selected_variant!.discount_percentage ?? 0;
        } else {
            return this.discount_percentage ?? 0;
        }
    }

    public getUnitOfMeasure(): string {
        if (this.variantExists()) {
            return this.selected_variant!.unit_of_measure ?? '';
        } else {
            return this.unit_of_measure ?? '';
        }
    }

    public getImages(): ProductImage[] {
        if (this.variantExists()) {
            return this.selected_variant!.images ?? [];
        } else {
            return this.images ?? [];
        }
    }

    public getImagePath(): string {
        if (this.variantExists()) {
            return String(this.id) + '/' + 'variant_images/' + String(this.selected_variant!.id);
        } else {
            return String(this.id);
        }
    }

    public getName(): string {
        if (this.variantExists()) {
            return this.selected_variant!.name ?? '';
        } else {
            return this.name ?? '';
        }
    }

    public getDescription(): string {
        if (this.variantExists()) {
            return this.selected_variant!.description ?? '';
        } else {
            return this.description ?? '';
        }
    }

    public getDetailedDescription(): string {
        if (this.variantExists()) {
            return this.selected_variant!.detailed_description ?? '';
        } else {
            return this.detailed_description ?? '';
        }
    }

    public getPreviewImageName(): string {
        if (this.variantExists()) {
            return this.selected_variant!.preview_image_name ?? '';
        } else {
            return this.preview_image_name ?? '';
        }
    }

    public getPreviewImageAltText(): string {
        if (this.variantExists()) {
            return this.selected_variant!.preview_image_alt_text ?? '';
        } else {
            return this.preview_image_alt_text ?? '';
        }
    }

    public getAvailabilityStatus(): string {
        if (this.availability_status == 'available') {
            return "Na zalihi";
        } else if (this.availability_status == 'unavailable') {
            return "Nedostupno";
        } else if (this.availability_status == 'partially_available') {
            return "5 do 10 dana";
        } else {
            return 'Nedostupno';
        }
    }

    public hasMoreThanOneVariant(): boolean {
        if (this.variantExists() && this.variants!.length! > 1) {
            return true;
        } else {
            return false;
        }
    }

    private variantExists(): boolean {
        if (this.variant_exists && !this.table_view_variant) {
            return true;
        }

        return false;
    }

    public getProductUrlName(): string {
        return this.name!.replace(/\s/g, '-').toLowerCase();
    }
}

export class ProductVariant {
    id?: number;
    item_id?: number;
    name?: string;
    description?: string;
    price_eur?: number;
    price_hrk?: number;
    disabled?: boolean;
    detailed_description?: string;
    preview_image_name?: string;
    preview_image_alt_text?: string;
    discount_percentage?: number;
    discount_price_hrk?: number;
    discount_price_eur?: number;
    unit_of_measure?: string;
    availability_status?: string;

    images?: ProductImage[];

    quantity?: number;
}

export class ProductCategory {
    id?: number;
    description?: string;
    identation?: number;
    order?: number;
    parent_category_id?: number;
    parent_cateogry_description?: string;
    disabled?: boolean;
}

export class KongresPredavac {
    id?: number;
    first_name?: string;
    last_name?: string;
    title?: string;
    photo_name?: string;
    text1?: string;
    text1_english?: string;
    text2?: string;
    text2_english?: string;
    text3?: string;
    text3_english?: string;
    theme?: string;
    theme_english?: string;
    disabled?: boolean;
}

export class KongresRadionica {
    id?: number;
    first_name?: string;
    last_name?: string;
    theme?: string;
    theme_english?: string;
    description?: string;
    description_english?: string;
    disabled?: boolean;
}

export class ProductImage {
    id?: number;
    name?: string;
    full_image_size_kb?: number;
    alt_text?: string;
    default?: boolean;
    order?: number;
}

/**
 * ORDER
 */
export class OrderHeader {
    id?: number;
    datetime?: Date;
    user_id?: number;
    cart_code?: string;
    bill_name?: string;
    bill_address?: string;
    bill_city?: string;
    bill_oib?: string;
    bill_post_code?: string;
    bill_email?: string;
    bill_phone_no?: string;
    bill_first_name?: string;
    bill_last_name?: string;
    ship_first_name?: string;
    ship_last_name?: string;
    ship_phone_no?: string;
    ship_email?: string;
    ship_county_id?: number;
    ship_address?: string;
    ship_city?: string;
    ship_post_code?: string;
    remark?: string;
    is_business_bill?: boolean;
    is_logged_in?: boolean;
    total_price_no_discount?: number;
    total_price?: number;
    total_price_no_vat?: number;
    total_vat?: number;
    total_discount?: number;
    special_discount_percentage?: number;
    special_discount_amount?: number;
    delivery?: number;
    is_payed?: boolean;
}

export class OrderLine {
    id?: number;
    order_header_id?: number;
    item_id?: number;
    variant_id?: number;
    price_without_discount?: number;
    price?: number;
    vat?: number;
    quantity?: number;
    total_price_no_discount?: number;
    total_price?: number;
    total_vat?: number;
    name?: string;
    description?: string;
    variant_name?: string;
    variant_description?: string;
}

/**
 * LOGIN
 */
export class Login {
    token?: string;
    role_name?: string;
}

/**
 * LOG
 */
export class Log {
    id?: number;
    request_origin?: string;
    request_path?: string;
    request_referer?: string;
    datetime?: Date;
}

/**
 * ITEMS
 */
export class ItemsResponseData {
    items_featured!: Product[];
    items_discount!: Product[];
    items_all!: Product[];
    item_categories!: ProductCategory[];
}

/**
 * CART
 */
export class CountyDeliveryRate {
    id?: number;
    name?: string;
    price_eur?: number;
    price_hrk?: number;
    free_after_limit?: number;
}

export class Cart {
    cart_items!: CartItem[];
    total_price!: number;
    total_price_no_discount!: number;
    total_discount_amount!: number;
    total_vat!: number;
    total_price_no_vat!: number;
    special_discount_percentage!: number;
    special_discount_amount!: number;
}

export class CartOrderDetails {
    cart_code?: string;
    is_logged_in?: boolean;

    first_name?: string;
    last_name?: string
    phone_no?: string;
    email?: string;
    county?: CountyDeliveryRate;
    address?: string;
    city?: string;
    post_code?: string;
    remark?: string;

    is_business_bill: boolean = false;
    business_oib?: string;
    business_name?: string;
    business_first_name?: string;
    business_last_name?: string;
    business_address?: string;
    business_city?: string;
    business_post_code?: string;
    business_phone_no?: string;
    business_email?: string;

    public getDeliveryPrice($cart_total: number): number {
        if ((this.county!.free_after_limit! != 0) && ($cart_total > (this.county!.free_after_limit!))) {
            return 0;
        } else {
            return this.county?.price_eur!;
        }
    }
}

export class CartItem {
    id?: number;
    user_id?: number;
    cart_code?: string;
    item_id?: number;
    variant_id?: number;
    quantity?: number;

    name?: string;
    description?: string;
    price_eur?: number;
    price_hrk?: number;
    category_description?: string;
    preview_image_name?: string;
    preview_image_alt_text?: string;
    discount_percentage?: number;
    discount_price_hrk?: number;
    discount_price_eur?: number;
    unit_of_measure?: string;
    availability_status?: string;
    table_view_variant?: boolean;

    total_price?: number;
    total_price_no_discount?: number;
    total_discount_amount?: number;
    total_vat?: number;
    total_price_no_vat?: number;

    selected_variant?: ProductVariant;
    variant_exists?: boolean;

    is_logged_in?: boolean;

    private variantExists(): boolean {
        if (this.variant_exists && !this.table_view_variant) {
            return true;
        }

        return false;
    }

    public getImagePath(): string {
        if (this.variantExists()) {
            return String(this.item_id) + '/' + 'variant_images/' + String(this.selected_variant!.id);
        } else {
            return String(this.item_id);
        }
    }

    public getPriceEur(): number {
        if (this.variant_exists) {
            return this.selected_variant!.price_eur ?? 0;
        } else {
            return this.price_eur ?? 0;
        }
    }

    public getDiscountPriceEur(): number {
        if (this.variant_exists) {
            return this.selected_variant!.discount_price_eur ?? 0;
        } else {
            return this.discount_price_eur ?? 0;
        }
    }

    public getPriceHrk(): number {
        if (this.variant_exists) {
            return this.selected_variant!.price_hrk ?? 0;
        } else {
            return this.price_hrk ?? 0;
        }
    }

    public getDiscountPriceHrk(): number {
        if (this.variant_exists) {
            return this.selected_variant!.discount_price_hrk ?? 0;
        } else {
            return this.discount_price_hrk ?? 0;
        }
    }

    public getDiscountPercentage(): number {
        if (this.variant_exists) {
            return this.selected_variant!.discount_percentage ?? 0;
        } else {
            return this.discount_percentage ?? 0;
        }
    }

    public getUnitOfMeasure(): string {
        if (this.variantExists()) {
            return this.selected_variant!.unit_of_measure ?? '';
        } else {
            return this.unit_of_measure ?? '';
        }
    }

    public getName(): string {
        if (this.variant_exists) {
            if (this.table_view_variant) {
                return (this.name ?? '') + ' - ' + (this.selected_variant!.name ?? '');
            } else {
                return this.selected_variant!.name ?? '';
            }
        } else {
            return this.name ?? '';
        }
    }

    public getProductUrlName(): string {
        return this.name!.replace(/\s/g, '-').toLowerCase();
    }

    public getDescription(): string {
        if (this.variantExists()) {
            return this.selected_variant!.description ?? '';
        } else {
            return this.description ?? '';
        }
    }

    public getPreviewImageName(): string {
        if (this.variantExists()) {
            return this.selected_variant!.preview_image_name ?? '';
        } else {
            return this.preview_image_name ?? '';
        }
    }

    public getPreviewImageAltText(): string {
        if (this.variantExists()) {
            return this.selected_variant!.preview_image_alt_text ?? '';
        } else {
            return this.preview_image_alt_text ?? '';
        }
    }

    public getAvailabilityStatus(): string {
        if (this.variant_exists) {
            if (this.selected_variant!.availability_status == 'available') {
                return "Na zalihi";
            } else if (this.selected_variant!.availability_status == 'unavailable') {
                return "Nedostupno";
            } else if (this.selected_variant!.availability_status == 'partially_available') {
                return "5 do 10 dana";
            } else {
                return 'Nedostupno';
            }
        } else {
            if (this.availability_status == 'available') {
                return "Na zalihi";
            } else if (this.availability_status == 'unavailable') {
                return "Nedostupno";
            } else if (this.availability_status == 'partially_available') {
                return "5 do 10 dana";
            } else {
                return 'Nedostupno';
            }
        }
    }

    public getTotalPrice(): number {
        return this.total_price ?? 0;
    }

    public getTotalPriceNoDiscount(): number {
        return this.total_price_no_discount ?? 0;
    }

    public getTotalDiscountAmount(): number {
        return this.total_discount_amount ?? 0;
    }

    public getTotalVat(): number {
        return this.total_vat ?? 0;
    }

    public getTotalPriceNoVat(): number {
        return this.total_price_no_vat ?? 0;
    }
}

export class CorvusInfo {
    version?: string;
    store_id?: string;
    order_number?: string;
    language?: string;
    currency?: string;
    amount?: number;
    cart?: string;
    require_complete?: boolean;
    signature?: string;
    payment_url?: string;
    redirect_url?: string;
}