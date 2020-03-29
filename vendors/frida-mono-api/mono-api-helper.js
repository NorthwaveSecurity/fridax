import MonoApi from './mono-api'

const rootDomain = MonoApi.mono_get_root_domain()

const MonoApiHelper = {
    AssemblyForeach: cb => {
        return MonoApi.mono_assembly_foreach(MonoApi.mono_assembly_foreach.nativeCallback(cb), NULL)
    },
    AssemblyLoadFromFull: (mono_image, filename, openStatusPtr, refonly) => {
        return MonoApi.mono_assembly_load_from_full(mono_image, Memory.allocUtf8String(filename), openStatusPtr, refonly)
    },
    ClassEnumBasetype: MonoApi.mono_class_enum_basetype,
    ClassFromMonoType: MonoApi.mono_class_from_mono_type,
    ClassFromName: (mono_image, name) => {
        const resolved = resolveClassName(name)
        return MonoApi.mono_class_from_name(mono_image, Memory.allocUtf8String(resolved.namespace), Memory.allocUtf8String(resolved.className))
    },
    ClassGetFieldFromName: (mono_class, name) => {
        return MonoApi.mono_class_get_field_from_name(mono_class, Memory.allocUtf8String(name))
    },
    ClassGetFields: mono_class => {
        const fields = []
        const iter = Memory.alloc(Process.pointerSize)
        let field

        while(!(field = MonoApi.mono_class_get_fields(mono_class, iter)).isNull()) {
            fields.push(field)
        }
        return fields
    },
    ClassGetMethodFromName: (mono_class, name, argCnt = -1) => {
        return MonoApi.mono_class_get_method_from_name(mono_class, Memory.allocUtf8String(name), argCnt)
    },
    ClassGetMethods: mono_class => {
        const methods = []
        const iter = Memory.alloc(Process.pointerSize)
        let method

        while(!(method = MonoApi.mono_class_get_methods(mono_class, iter)).isNull()) {
            methods.push(method)
        }
        return methods
    },
    ClassGetName: mono_class => {
        return Memory.readUtf8String(MonoApi.mono_class_get_name(mono_class))
    },
    ClassGetType: MonoApi.mono_class_get_type,
    ClassIsEnum: mono_class => MonoApi.mono_class_is_enum(mono_class) === 1,
    CompileMethod: MonoApi.mono_compile_method,
    DomainGet: MonoApi.mono_domain_get,
    FieldGetFlags: MonoApi.mono_field_get_flags,
    FieldGetName: mono_field => Memory.readUtf8String(MonoApi.mono_field_get_name(mono_field)),
    FieldGetValueObject: (mono_field, mono_object, domain = rootDomain) => {
        return MonoApi.mono_field_get_value_object(domain, mono_field, mono_object)
    },
    GetBooleanClass: MonoApi.mono_get_boolean_class,
    GetInt32Class: MonoApi.mono_get_int32_class,
    GetSingleClass: MonoApi.mono_get_single_class,
    GetStringClass: MonoApi.mono_get_string_class,
    GetUInt32Class: MonoApi.mono_get_uint32_class,
    ImageLoaded: name => MonoApi.mono_image_loaded(Memory.allocUtf8String(name)),
    MethodGetFlags: (mono_method, iflags = 0) => MonoApi.mono_method_get_flags(mono_method, iflags),
    MethodGetName: mono_method => Memory.readUtf8String(MonoApi.mono_method_get_name(mono_method)),
    MethodSignature: MonoApi.mono_method_signature,
    ObjectGetClass: MonoApi.mono_object_get_class,
    ObjectGetVirtualMethod: MonoApi.mono_object_get_virtual_method,
    ObjectNew: (mono_class, domain = rootDomain) => MonoApi.mono_object_new(domain, mono_class),
    ObjectUnbox: mono_object => MonoApi.mono_object_unbox(mono_object),
    RuntimeInvoke: (mono_method, instance = NULL, args = NULL) => {
        const exception = NULL
        const result = MonoApi.mono_runtime_invoke(mono_method, instance, args, exception)

        if (!exception.isNull()) {
            throw new Error('Unknown exception happened')
        }

        return result
    },
    SignatureGetParamCount: MonoApi.mono_signature_get_param_count, SignatureGetParams: signature => {
        let params = []
        let iter = Memory.alloc(Process.pointerSize)
        let type

        while(!(type = MonoApi.mono_signature_get_params(signature, iter)).isNull()) {
            params.push(type)
        }

        return params
    },
    StringNew: (str, domain = rootDomain) => MonoApi.mono_string_new(domain, Memory.allocUtf8String(str)),
    StringToUtf8: mono_string => Memory.readUtf8String(MonoApi.mono_string_to_utf8(mono_string)),
    TypeGetClass: MonoApi.mono_type_get_class,
    TypeGetName: mono_type => Memory.readUtf8String(MonoApi.mono_type_get_name(mono_type)),
    TypeGetType: MonoApi.mono_type_get_type,
    TypeGetUnderlyingType: MonoApi.mono_type_get_underlying_type,
    ValueBox: (mono_class, valuePtr, domain = rootDomain) => MonoApi.mono_value_box(domain, mono_class, valuePtr)
}

function resolveClassName(className) {
    return {
        className: className.substring(className.lastIndexOf('.')+1),
        namespace: className.substring(0, className.lastIndexOf('.'))
    }
}

export default MonoApiHelper
