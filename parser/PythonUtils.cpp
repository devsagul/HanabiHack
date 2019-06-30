#include "PythonUtils.h"

using namespace std;

// =====
// LISTS
// =====

PyObject* vectorToList_Float(const vector<float> &data)
{
    PyObject* listObj = PyList_New( data.size() );
	if (!listObj)
        throw logic_error("Unable to allocate memory for Python list");
	for (unsigned int i = 0; i < data.size(); i++)
    {
		PyObject *num = PyFloat_FromDouble( (double) data[i]);
		if (!num)
        {
			Py_DECREF(listObj);
			throw logic_error("Unable to allocate memory for Python list");
		}
		PyList_SET_ITEM(listObj, i, num);
	}
	return listObj;
}

PyObject* MasToList_int(const int *data, size_t size)
{
    PyObject* listObj = PyList_New(size);
	if (!listObj)
        throw logic_error("Unable to allocate memory for Python list");
	for (size_t i = 0; i < size; i++)
    {
		PyObject *num = PyLong_FromLong(data[i]);
		if (!num)
        {
			Py_DECREF(listObj);
			throw logic_error("Unable to allocate memory for Python list");
		}
		PyList_SET_ITEM(listObj, i, num);
	}
	return listObj;
}

int *ListToMas_int(PyObject *aList)
{
    auto Result = new int[PyList_Size(aList)];
    for(Py_ssize_t i = 0; i < PyList_Size(aList); i++)
        Result[i] = PyLong_AS_LONG(PyList_GetItem(aList, i));
    return (Result);
}

// ======
// TUPLES
// ======

PyObject* vectorToTuple_Float(const vector<float> &data)
{
	PyObject* tuple = PyTuple_New( data.size() );
	if (!tuple) throw logic_error("Unable to allocate memory for Python tuple");
	for (unsigned int i = 0; i < data.size(); i++)
    {
		PyObject *num = PyFloat_FromDouble( (double) data[i]);
		if (!num)
        {
			Py_DECREF(tuple);
			throw logic_error("Unable to allocate memory for Python tuple");
		}
		PyTuple_SET_ITEM(tuple, i, num);
	}
	return tuple;
}

PyObject* vectorVectorToTuple_Float(const vector< vector< float > > &data)
{
	PyObject* tuple = PyTuple_New( data.size() );
	if (!tuple) throw logic_error("Unable to allocate memory for Python tuple");
	for (unsigned int i = 0; i < data.size(); i++)
    {
		PyObject* subTuple = NULL;
		try
        {
			subTuple = vectorToTuple_Float(data[i]);
		} 
        catch (logic_error &e)
        {
			throw e;
		}
		if (!subTuple)
        {
			Py_DECREF(tuple);
			throw logic_error("Unable to allocate memory for Python tuple of tuples");
		}
		PyTuple_SET_ITEM(tuple, i, subTuple);
	}
	return tuple;
}

// PyObject -> Vector
vector<float> listTupleToVector_Float(PyObject* incoming)
{
	vector<float> data;
	if (PyTuple_Check(incoming))
    {
		for(Py_ssize_t i = 0; i < PyTuple_Size(incoming); i++)
        {
			PyObject *value = PyTuple_GetItem(incoming, i);
			data.push_back( PyFloat_AsDouble(value) );
		}
	} 
    else
    {
		if (PyList_Check(incoming))
        {
			for(Py_ssize_t i = 0; i < PyList_Size(incoming); i++)
            {
				PyObject *value = PyList_GetItem(incoming, i);
				data.push_back( PyFloat_AsDouble(value) );
			}
		} 
        else
        {
			throw logic_error("Passed PyObject pointer was not a list or tuple!");
		}
	}
	return data;
}

// PyObject -> Vector
vector<int> listTupleToVector_Int(PyObject* incoming)
{
	vector<int> data;
	if (PyTuple_Check(incoming))
    {
		for(Py_ssize_t i = 0; i < PyTuple_Size(incoming); i++)
        {
			PyObject *value = PyTuple_GetItem(incoming, i);
			data.push_back( PyFloat_AsDouble(value) );
		}
	}
    else
    {
		if (PyList_Check(incoming))
        {
			for(Py_ssize_t i = 0; i < PyList_Size(incoming); i++)
            {
				PyObject *value = PyList_GetItem(incoming, i);
				data.push_back( PyFloat_AsDouble(value) );
			}
		}
        else
        {
			throw logic_error("Passed PyObject pointer was not a list or tuple!");
		}
	}
	return data;
}
