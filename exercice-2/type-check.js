console.log(typeof null);

function type_check_v1(value, type) {
  switch(typeof value) {
    case "boolean":
    case "string":
    case "number":
    case "undefined":
    case "function":
        return type === typeof value;
    case "object":
       switch(type) {
           case "array":
               return Array.isArray(value);
           case "null":
               return value === null;
           default:
               return value !== null && !Array.isArray(value);
       }
   }

   return false
}

console.log(type_check_v1([],"array"));


function type_check_v2(value, conf) {
  for (key in conf) {
    switch (key) {
      case "type":
        if (!type_check_v1(value, conf.type)) return false;
        break;
      case "value":
        if (JSON.stringify(value) !== JSON.stringify(conf.value)) return false;
        break;
      case "enum":
        // Par défault, non trouvé dans l'enum
        let found = false;
        for (subValue of conf.enum) {
          found = type_check_v2(value, { value: subValue });
          // ou
          // found = JSON.stringify(value) !== JSON.stringify(subValue);

          // Si je trouve, je m'arrete
          if (found) break;
        }
        // Si je ne me suis jamais arrêté, value n'est pas dans l'enum => return false
        if (!found) return false;
        break;
    }
  }

  return true;
}

function type_check(arg, types) {
    let ischecked = type_check_v2(arg, types);
    if (!types.properties) return ischecked;
    for (const typeKey in types.properties) {
        ischecked = type_check(type_check_v1(arg, 'object') ? arg[typeKey] : arg, types.properties[typeKey])
        if (!ischecked) break;
    }
    return ischecked;
}

