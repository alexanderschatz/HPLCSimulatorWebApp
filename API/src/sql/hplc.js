exports.getCompounds = () => 'Select * from compounds'
exports.getSolvents = () => 'Select * from solvents'
exports.getColumns = () => 'Select * from columns'
exports.getGlobals = () => `
SELECT globals.*, columns.name AS columnName, solvents.name AS solventName, compounds.name AS compoundName
FROM globals
JOIN columns ON globals.fk_column = columns.pk_column
JOIN solvents ON globals.fk_solvent = solvents.pk_solvent
JOIN compounds ON globals.fk_compound = compounds.pk_compound
;
`

exports.insertGlobal = ({ fk_column, fk_solvent, fk_compound, kw_slope, kw_intercept, s_slope, s_intercept }) => `
    insert into globals (fk_column, fk_solvent, fk_compound, kw_slope, kw_intercept, s_slope, s_intercept)
    values (${+fk_column}, ${+fk_solvent}, ${+fk_compound}, ${+kw_slope}, ${+kw_intercept}, ${+s_slope}, ${+s_intercept});
`
exports.insertColumn = ({ columnName, length, inner_diameter, particle_size }) => `
    insert into columns (name, length, inner_diameter, particle_size)
    values ('${columnName}', ${+length}, ${+inner_diameter}, ${+particle_size});
`
exports.insertCompound = ({ compoundName, molar_mass, molar_volume, density  }) => `
    insert into compounds (name, molar_mass, molar_volume, density )
    values ('${compoundName}', ${+molar_mass}, ${+molar_volume}, ${+density});
`
exports.insertSolvent = (solventName) => `
    insert into solvents (name)
    values ('${solventName}');
`