export interface Category {
  id: number;
  name: string;
  quality: CategoryQuality;
  description: string;
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
