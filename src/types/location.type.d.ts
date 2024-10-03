type LocationType = {
  id: string;
  sportFieldId?: string;
  provinceId: string;
  districtId: string;
  wardId: string;
  addressDetail: string;
  longitude: number;
  latitude: number;
};

type Province = {
  id?: string;
  name: string;
};

type District = {
  id?: string;
  name: string;
  provinceId: string;
};

type Ward = {
  id?: string;
  name: string;
  districtId: string;
};
