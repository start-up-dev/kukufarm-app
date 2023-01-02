import _ from 'lodash';

export const validateForm = (data: any) => {
    const errors: any = {};

    const values = Object.values(data)
    const keys = Object.keys(data)


    values.forEach((value: any, index: number) => {
        if (value === '' || value === undefined) {
            errors[keys[index]] = `${_.startCase(keys[index])} is Required!`
        }
    })

    if (_.isEmpty(errors)) return true
    throw errors
}