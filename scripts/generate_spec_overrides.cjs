const fs = require('fs');

const jsonPath = 'D:\\hof-pack\\exports\\product-spec-table-fields.json';
const specData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

const outputCode = `// Auto-generated product specification table fields from product-spec-table-fields.json (149 products)

export interface ProductSpecTableData {
  name: string;
  stockInfo: string;
  sizeInfo: string;
  minQuantity: string;
  printingOptions: string;
  finishingOptions: string;
  proofInfo: string;
  turnaroundTime: string;
  specOverrides?: {
    dimension_info?: string;
    quantities_info?: string;
    turnaround_label?: string;
    rush_available?: boolean;
    printing_options_list?: string[];
    finishing_options_list?: string[];
    included_options?: string[];
    additional_options?: string[];
  };
}

export const PRODUCT_SPEC_TABLE_DATA: Record<string, ProductSpecTableData> = ${JSON.stringify(specData.products, null, 2)};

export const DEFAULT_SPEC_TEMPLATE: ProductSpecTableData = ${JSON.stringify(specData.defaultTemplate, null, 2)};
`;

fs.writeFileSync('src/data/product-spec-overrides.ts', outputCode, 'utf8');
console.log('Successfully written src/data/product-spec-overrides.ts with 149 products!');
