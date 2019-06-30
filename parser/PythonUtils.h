#include <python3.6m/Python.h>
#include <vector>
#include <stdexcept>

#ifndef PYTHON_UTILS_H
# define PYTHON_UTILS_H

PyObject* vectorToList_Float(const std::vector<float> &data);
PyObject* vectorToTuple_Float(const std::vector<float> &data);
PyObject* vectorVectorToTuple_Float(const std::vector< std::vector< float > > &data);
std::vector<float> listTupleToVector_Float(PyObject* incoming);
std::vector<int> listTupleToVector_Int(PyObject* incoming);
PyObject* MasToList_int(const int *data, size_t size);
int *ListToMas_int(PyObject *aList);

#endif // !PYTHON_UTILS_H