export interface Category {
  id: number;
  categoryName: string;
  quality: CategoryQuality;
  remark: string;
}

export interface CategoryQuality {
  resolution: CategoryQualityItem;
  codec: CategoryQualityItem;
  medium: CategoryQualityItem;
  audio: CategoryQualityItem;
}

export interface CategoryQualityItem {
  name: string;
  value: string[];
}
