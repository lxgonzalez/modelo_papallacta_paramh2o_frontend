import React from 'react';
import { useForm } from 'react-hook-form';
import { Calendar, MapPin, Settings, CheckCircle, AlertCircle, Zap } from 'lucide-react';
import { validateCoordinates, validateDate } from '../utils/validation';
import { demoFormData } from '../utils/demoData';

const ANALYSIS_TYPES = [
    { id: 'general', label: 'General', description: 'Análisis meteorológico general' },
    { id: 'cultivos', label: 'Cultivos', description: 'Recomendaciones para cultivos' },
    { id: 'riego', label: 'Riego', description: 'Optimización del riego' },
    { id: 'alertas', label: 'Alertas', description: 'Alertas meteorológicas' },
    { id: 'cronograma', label: 'Cronograma', description: 'Planificación agrícola' },
    { id: 'plagas', label: 'Plagas', description: 'Control de plagas' },
    { id: 'suelo', label: 'Suelo', description: 'Análisis del suelo' },
];

const PredictionForm = ({ onSubmit, isLoading }) => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        setValue,
    } = useForm({
        defaultValues: {
            date: '',
            latitude: '',
            longitude: '',
            include_analysis: false,
            analysis_types: [],
        },
    });

    const includeAnalysis = watch('include_analysis');
    const analysisTypes = watch('analysis_types');

    const handleAnalysisTypeChange = (typeId) => {
        const current = analysisTypes || [];
        const updated = current.includes(typeId)
            ? current.filter(id => id !== typeId)
            : [...current, typeId];
        setValue('analysis_types', updated);
    };

    const loadDemoData = () => {
        setValue('date', demoFormData.date);
        setValue('latitude', demoFormData.latitude);
        setValue('longitude', demoFormData.longitude);
        setValue('include_analysis', demoFormData.include_analysis);
        setValue('analysis_types', demoFormData.analysis_types);
    };

    const onFormSubmit = (data) => {
        const payload = {
            date: data.date,
            latitude: parseFloat(data.latitude),
            longitude: parseFloat(data.longitude),
            include_analysis: data.include_analysis,
            analysis_types: data.include_analysis ? data.analysis_types : [],
        };
        onSubmit(payload);
    };

    return (
        <div className="rounded-2xl p-8 max-w-2xl mx-auto mt-8">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-text-primary">
                    Predicción Agrícola
                </h2>
                <p className="text-gray-600 mb-4">
                    Obtén análisis meteorológicos y recomendaciones para tu actividad agrícola
                </p>
            </div>

            <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
                {/* Date Input */}
                <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                        <Calendar className="inline-block w-4 h-4 mr-2" />
                        Fecha
                    </label>
                    <input
                        type="date"
                        {...register('date', {
                            required: 'La fecha es requerida',
                            validate: validateDate
                        })}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-agricultural-green focus:ring-2 focus:ring-agricultural-green focus:ring-opacity-20 transition-colors"
                    />
                    {errors.date && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                            <AlertCircle className="w-4 h-4 mr-1" />
                            {errors.date.message}
                        </p>
                    )}
                </div>

                {/* Coordinates */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-text-primary mb-2">
                            <MapPin className="inline-block w-4 h-4 mr-2" />
                            Latitud
                        </label>
                        <input
                            type="number"
                            step="any"
                            placeholder="-0.35"
                            {...register('latitude', {
                                required: 'La latitud es requerida',
                                validate: validateCoordinates.latitude,
                            })}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-agricultural-green focus:ring-2 focus:ring-agricultural-green focus:ring-opacity-20 transition-colors"
                        />
                        {errors.latitude && (
                            <p className="mt-1 text-sm text-red-600 flex items-center">
                                <AlertCircle className="w-4 h-4 mr-1" />
                                {errors.latitude.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-text-primary mb-2">
                            <MapPin className="inline-block w-4 h-4 mr-2" />
                            Longitud
                        </label>
                        <input
                            type="number"
                            step="any"
                            placeholder="-78.17"
                            {...register('longitude', {
                                required: 'La longitud es requerida',
                                validate: validateCoordinates.longitude,
                            })}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-agricultural-green focus:ring-2 focus:ring-agricultural-green focus:ring-opacity-20 transition-colors"
                        />
                        {errors.longitude && (
                            <p className="mt-1 text-sm text-red-600 flex items-center">
                                <AlertCircle className="w-4 h-4 mr-1" />
                                {errors.longitude.message}
                            </p>
                        )}
                    </div>
                </div>

                {/* Include Analysis Checkbox */}
                <div>
                    <label className="flex items-center space-x-3 cursor-pointer">
                        <input
                            type="checkbox"
                            {...register('include_analysis')}
                            className="w-5 h-5 text-agricultural-green rounded focus:ring-agricultural-green focus:ring-2"
                        />
                        <span className="text-sm font-medium text-text-primary">
                            <Settings className="inline-block w-4 h-4 mr-2" />
                            Incluir análisis inteligente
                        </span>
                    </label>
                </div>

                {/* Analysis Types */}
                {includeAnalysis && (
                    <div>
                        <label className="block text-sm font-medium text-text-primary mb-4">
                            Tipos de análisis
                        </label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {ANALYSIS_TYPES.map((type) => (
                                <div
                                    key={type.id}
                                    className={`p-4 rounded-lg border cursor-pointer transition-all ${analysisTypes?.includes(type.id)
                                        ? 'border-agricultural-green bg-agricultural-green/5'
                                        : 'border-gray-200 hover:border-agricultural-green hover:bg-gray-50'
                                        }`}
                                    onClick={() => handleAnalysisTypeChange(type.id)}
                                >
                                    <div className="flex items-start space-x-3">
                                        <div className="mt-1">
                                            {analysisTypes?.includes(type.id) ? (
                                                <CheckCircle className="w-5 h-5 text-agricultural-green" />
                                            ) : (
                                                <div className="w-5 h-5 rounded-full border-2 border-gray-300"></div>
                                            )}
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-text-primary">{type.label}</h4>
                                            <p className="text-sm text-gray-600">{type.description}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-agricultural-green text-white py-4 px-6 rounded-lg font-medium hover:bg-opacity-90 focus:ring-2 focus:ring-agricultural-green focus:ring-opacity-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? (
                        <span className="flex items-center justify-center">
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                            Procesando...
                        </span>
                    ) : (
                        'Obtener Predicción'
                    )}
                </button>
            </form>
        </div>
    );
};

export default PredictionForm;
