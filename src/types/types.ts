export type calculationType = {
    id: string
    name: string
    calculationEnd: string
    sechName: string
    progress: number
    pathToRegim: string
    percentLoad: number
    percentForWorsening: number
    description?: string
};

type sechType = {
    num: number
    sechName: string
    brunches: any 
};
type districtType = {
    number: number 
    name: string
};
type nodeType = {
    name: string
    number: number
    district: districtType
};
type brunchType = {
    startNode: number
    endNode: number
    parallelNumber: number
    name: string
}
export type rastrSchemeInfoType = {
    seches:  Array<sechType>
    districts: Array<districtType>
    loadNodes : Array<nodeType>
    nodes : Array<nodeType>
    brunches : Array<brunchType>
};

export type fileType ={
    name: string
    lastModified: string
}