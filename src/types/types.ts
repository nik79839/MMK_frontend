type worseningSettingsType = {
    nodeNumber: number
    maxValue: number
}
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
    worseningSettings: Array<worseningSettingsType>
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

export type usersType = {
    name: string
    login: string
    post: string
}

export type userType = {
    name: string
    token: string
}

type histogramDataType = {
    interval: string
    height: string
};
export type statisticBaseType = {
    maximum: string
    minimum: string
    mean: string
    stD: string
    histogramData: Array<histogramDataType>
};
export type calculationResultBaseType = {
    implementationId: number
    value: number
};
interface powerFlowResultProcessedType extends statisticBaseType {  
};
interface voltageResultProcessedType extends statisticBaseType {
    nodeName: string
};
interface currentResultProcessedType extends statisticBaseType {
    brunchName: string
};
interface powerFlowResultType extends calculationResultBaseType {
};
interface voltageResultType extends calculationResultBaseType {
    nodeNumber: number
    nodeName: string
};
interface currentResultType extends calculationResultBaseType {
    brunchName: string
};
export type calculationResultInfoType = {
    powerFlowResultProcessed: powerFlowResultProcessedType,
            voltageResultProcessed: Array<voltageResultProcessedType>,
            currentResultProcessed: Array<currentResultProcessedType>,
            powerFlowResults: Array<powerFlowResultType>,
            voltageResults: Array<voltageResultType>,
            currentResults: Array<currentResultType>,
            worseningSettings: Array<number>
}