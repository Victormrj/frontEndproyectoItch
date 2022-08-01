import moment from "moment"

export const prepareMaterial = ( material = [] ) =>{

    // console.log(material)
    return material.map(
        (e) => ({
            ...e,
            fechaIngreso: moment(e.fechaIngreso).toDate(),
            horaIngreso: moment(e.horaIngreso).toDate(),

        })
    )
}

export const prepareHerramienta = ( herramienta = [] ) =>{

    // console.log(material)
    return herramienta.map(
        (e) => ({
            ...e,
            fechaIngreso: moment(e.fechaIngreso).toDate(),
            horaIngreso: moment(e.horaIngreso).toDate(),

        })
    )
}

export const prepareEquipo = ( equipo = [] ) =>{

    // console.log(material)
    return equipo.map(
        (e) => ({
            ...e,
            fechaIngreso: moment(e.fechaIngreso).toDate(),
            inicioMantenimiento: moment(e.inicioMantenimiento).toDate(),
            proximoMantenimiento: moment(e.proximoMantenimiento).toDate()

        })
    )
}
