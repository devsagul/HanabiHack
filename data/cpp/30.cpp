/*
* $Id: SortConditionManager.cpp 2010-4-21  $
* 
* Thie file is part of Scheduler for SortConditionManager
* 
* Copyright (C)2006-2010 �����������(�Ϻ�)���޹�˾ 
* 
* Author yp
* 
* version 1.0
*/

#include "stdafx.h"
#include "SortConditionManager.h"
#include "YKSchSysParam.h"

#include "Biz_API.h"
YK_REGISTER_GLOBAL_IMPL(BIZ,SortConditionManager, YKRegisterInfo::ObjAttribute::OA_Normal)
namespace BIZ {

YK_INT SortCondition::CompareTableRelCodeResult(YK_ID firstId, YK_ID secondId)
{
	YKString wstrValue1 = BIZ::GetValue(m_tblType,firstId,m_filedType);
	YKString wstrValue2 = BIZ::GetValue(m_tblType,secondId,m_filedType);
	return CompareTableRelCodeResult(wstrValue1,wstrValue2);
}

//Add 2011-10-27 ����ȽϽ��ֵ
YK_INT SortCondition::CompareTableRelCodeResult(YKString& wstrValue1,YKString& wstrValue2)
{
	if(m_sortType == ST_ASCENDING)	
	{
		return AscendingCompTableRelCodeResult(wstrValue1,wstrValue2);				//����
	}
	else	
	{
		return DescendingCompTableRelCodeResult(wstrValue1,wstrValue2);				//����
	}


	return false;
}


//Add 2011-10-27 ��������
YK_INT SortCondition::AscendingCompTableRelCodeResult(YKString& wstrValue1,YKString& wstrValue2)
{
	//��ֵֻ��ȣ����������Ϣ
	if(wstrValue1 == wstrValue2)
		return COMPAREEQU;

	if (m_compValueType == 21)
	{
		YKSchSysParamSPtr sysParam = g_Application.GetModule<YKDataBase>()->Get<YKSchSysParam>();
		YKSchSysParam::DateShowType dateType = sysParam->GetTimeShowType();
		YKDateTime tm1;
		YKDateTime tm2;
		switch (dateType)
		{
		case DB::YKSchSysParam::DateType_YMD:
			{
				tm1 = YKDateTime::Parse(wstrValue1,YKDateTime::DTF_YMDHMS1);
				tm2 = YKDateTime::Parse(wstrValue2,YKDateTime::DTF_YMDHMS1);
			}
			break;
		case DB::YKSchSysParam::DateType_MDY:
			{
				tm1 = YKDateTime::Parse(wstrValue1,YKDateTime::DTF_MDYHMS1);
				tm2 = YKDateTime::Parse(wstrValue2,YKDateTime::DTF_MDYHMS1);
			}
			break;
		case DB::YKSchSysParam::DateType_DMY:
			{
				tm1 = YKDateTime::Parse(wstrValue1,YKDateTime::DTF_DMYHMS1);
				tm2 = YKDateTime::Parse(wstrValue2,YKDateTime::DTF_DMYHMS1);
			}
			break;
		case DB::YKSchSysParam::DateType_MD:
			{
				tm1 = YKDateTime::Parse(wstrValue1,YKDateTime::DTF_MDHM);
				tm2 = YKDateTime::Parse(wstrValue2,YKDateTime::DTF_MDHM);
			}
		default:
			break;
		}

		if(tm1 < tm2)
			return COMPARETRUE;
		else
			return COMPAREFALSE;
	}
	else if (m_compValueType == 22)
	{
		if(CExtraValue(wstrValue1).GetTime() < CExtraValue(wstrValue2).GetTime())
			return COMPARETRUE;
		else
			return COMPAREFALSE;
	}
	else
	{
		if(wstrValue1.compare(wstrValue2) < 0)
			return COMPARETRUE;
		else
			return COMPAREFALSE;
	}

	return COMPARETRUE;
}

//Add 2011-10-27 ��������
int SortCondition::DescendingCompTableRelCodeResult(YKString& wstrValue1,YKString& wstrValue2)
{
	//��ֵֻ��ȣ����������Ϣ
	if(wstrValue1 == wstrValue2)
		return COMPAREEQU;

	if (m_compValueType == 21)
	{
		YKSchSysParamSPtr sysParam = g_Application.GetModule<YKDataBase>()->Get<YKSchSysParam>();
		YKSchSysParam::DateShowType dateType = sysParam->GetTimeShowType();
		YKDateTime tm1;
		YKDateTime tm2;
		switch (dateType)
		{
		case DB::YKSchSysParam::DateType_YMD:
			{
				tm1 = YKDateTime::Parse(wstrValue1,YKDateTime::DTF_YMDHMS1);
				tm2 = YKDateTime::Parse(wstrValue2,YKDateTime::DTF_YMDHMS1);
			}
			break;
		case DB::YKSchSysParam::DateType_MDY:
			{
				tm1 = YKDateTime::Parse(wstrValue1,YKDateTime::DTF_MDYHMS1);
				tm2 = YKDateTime::Parse(wstrValue2,YKDateTime::DTF_MDYHMS1);
			}
			break;
		case DB::YKSchSysParam::DateType_DMY:
			{
				tm1 = YKDateTime::Parse(wstrValue1,YKDateTime::DTF_DMYHMS1);
				tm2 = YKDateTime::Parse(wstrValue2,YKDateTime::DTF_DMYHMS1);
			}
			break;
		case DB::YKSchSysParam::DateType_MD:
			{
				tm1 = YKDateTime::Parse(wstrValue1,YKDateTime::DTF_MDHM);
				tm2 = YKDateTime::Parse(wstrValue2,YKDateTime::DTF_MDHM);
			}
		default:
			break;
		}
		if(tm1 > tm2)
			return COMPARETRUE;
		else
			return COMPAREFALSE;
	}
	else if (m_compValueType == 22)
	{
		if(CExtraValue(wstrValue1).GetTime() > CExtraValue(wstrValue2).GetTime())
			return COMPARETRUE;
		else
			return COMPAREFALSE;
	}
	else
	{
		if(wstrValue2.compare(wstrValue1) < 0)
			return COMPARETRUE;
		else
			return COMPAREFALSE;
	}

	return COMPARETRUE;
}

void SortCondition::SetCompValueType(YK_UINT compValueType)
{
	if (compValueType == CHECKTYPE_TIME1)
	{
		m_compValueType = 21;
	}
	else if (compValueType == CHECKTYPE_TIME2
		||compValueType == CHECKTYPE_TIME4
		||compValueType == CHECKTYPE_TIME5)
	{
		m_compValueType = 22;
	}
	else  m_compValueType =  compValueType;
}

void SortConditionList::InsertSortCondition( SortCondition& sortCon )
{
	m_scList.push_back(sortCon);
}
void SortConditionList::InsertSortCondition_Safe(SortCondition& sortCon)
{
	for (StartLoop();NotEnd();Step())
	{
		if (m_itor->GetFiledType() == sortCon.GetFiledType())
		{
			// �ҵ���Ӧ ��ת����ʽ
			sortCon.SetSortType(m_itor->GetSortType()==ST_ASCENDING?ST_DESCENDING:ST_ASCENDING);
			m_scList.erase(m_itor);
			break;
		}
	}
	m_scList.push_back(sortCon);
}

void SortConditionList::DeleteSortCon( list<YK_ID>& seqList )
{
	//��ʱ����
	list<SortCondition>::iterator iter = m_scList.begin();

	//����Դɸѡ�����б�,��0��ʼ
	for(YK_UINT i=0;i<m_scList.size();i++)
	{
		//����ɸѡ�б��У�����
		if(find(seqList.begin(),seqList.end(),i) != seqList.end())
		{
			iter = m_scList.erase(iter);
		}
		else
		{
			iter++;
		}
	}

}

//����2������˳���ϵ�λ��
void SortConditionList::SwapSeq( YK_UINT first,YK_UINT second )
{
	if(first == second)
		return;

	//��ʱ����
	list<SortCondition>::iterator iter = m_scList.begin();
	list<SortCondition>::iterator iter1 = m_scList.end();
	list<SortCondition>::iterator iter2 = iter1;

	//����Դɸѡ�����б�,��0��ʼ
	for(YK_UINT i=0;i<m_scList.size()&&iter!=m_scList.end();i++)
	{
		//����ɸѡ�б��У�����
		if(first == i)
		{
			iter1 = iter;
		}
		if(second == i)
		{
			iter2 = iter;
		}
		iter++;
	}
	if(iter1 == m_scList.end() || iter2 == m_scList.end())
		return;

	swap(*iter1,*iter2);
}

void SortConditionList::ModifyFilterCondition(YK_INT index,SortCondition& sortcondition)
{
	if (m_scList.size() <= index)
	{
		m_scList.push_back(sortcondition);
	}
	else
	{
		if(index < 0) return ;
		int i=0;
		for (StartLoop();NotEnd();Step(),i++)
		{
			if(i == index)
			{
				(*m_itor) = sortcondition;
				break;
			}
		}
	}
}

//Add 2011-10-27  ����
YK_BOOL SortConditionList::CompareTableRelCodeResult(YK_ID firstId, YK_ID secondId)
{
	for(list<SortCondition>::reverse_iterator iter =	m_scList.rbegin();
		iter != m_scList.rend();iter++)
	{
		int rt = iter->CompareTableRelCodeResult(firstId,secondId);
		if(rt == COMPAREFALSE)
		{
			return false;
		}
		else if( rt == COMPARETRUE)
		{
			return true;
		}

	}

	return firstId < secondId;
}

std::wstring SortConditionList::GetSerializeStr()
{
	std::wostringstream ossOut(wostringstream::out);   //�Ѷ���д���ַ����������
	boost::archive::text_woarchive oa(ossOut);

	oa << *this;
	return ossOut.str();

}

void SortConditionList::InitBySerializeStr( std::wstring& serializeStr )
{
	if (serializeStr.empty())
		return ;
	wistringstream ossIn(serializeStr);      //���ַ����������ж�������
	boost::archive::text_wiarchive ia(ossIn);
	ia >> *this;
}

SortConditionManager::SortConditionManager(void)
{
}

SortConditionManager::~SortConditionManager(void)
{
}

YK_BOOL SortConditionManager::InsertSortCondition(SortCondition& sortCon, YK_CTYPERef tblType, YK_ID id /* = 0 */)
{
	//������Ͳ��Ϸ�����������
	if(sortCon.GetTblType() != OTNone)
	{
		if (id == 0)
			m_sortConMap[tblType].InsertSortCondition(sortCon);
		else
			m_sortObjMap[tblType][id].InsertSortCondition(sortCon);

		return true;
	}

	return false;
}

YK_BOOL SortConditionManager::InsertSortCondition_Safe(SortCondition& sortCon )
{
	//������Ͳ��Ϸ�����������
	if(sortCon.GetTblType() != OTNone)
	{
		m_sortConMap[sortCon.GetTblType()].InsertSortCondition_Safe(sortCon);
		return true;
	}

	return false;
}

void SortConditionManager::DeleteSortCon(YK_CTYPERef tblType,list<YK_ID>& seqList)
{
	map<YK_TYPE, SortConditionList >::iterator iter = m_sortConMap.find(tblType);
	if(iter != m_sortConMap.end())
	{
		return iter->second.DeleteSortCon(seqList);
	}
}


void SortConditionManager::SwapSeq(YK_CTYPERef tblType,YK_UINT first,YK_UINT second)
{
	map<YK_TYPE, SortConditionList >::iterator iter = m_sortConMap.find(tblType);
	if(iter != m_sortConMap.end())
	{
		return iter->second.SwapSeq(first,second);
	}

	return ;
}

YK_BOOL SortConditionManager::GetSortConList(YK_CTYPERef tblType, YK_ID id, SortConditionList& sortConList)
{
	if (id == 0)
	{
		map<YK_TYPE, SortConditionList >::iterator iter = m_sortConMap.find(tblType);
		if(iter != m_sortConMap.end())
		{
			sortConList = iter->second;
			if(sortConList.GetSize() <= 0)
				return false;
			return true;
		}
	}
	else
	{
		auto iter = m_sortObjMap.find(tblType);
		if (iter != m_sortObjMap.end())
		{
			auto iterObj = iter->second.find(id);
			if (iterObj != iter->second.end())
			{
				sortConList = iterObj->second;
				if (sortConList.GetSize() <= 0)
					return false;
				return true;
			}
		}
	}
	
	return false;
}

void SortConditionManager::DeleteConByIndex(YK_CTYPERef tblType, YK_ID idObj /* = 0 */)
{
	if (idObj == 0)
	{
		map<YK_TYPE, SortConditionList >::iterator iter = m_sortConMap.find(tblType);
		if(iter != m_sortConMap.end())
		{
			m_sortConMap.erase(iter);
		}
	}
	else
	{
		auto iter = m_sortObjMap.find(tblType);
		if (iter != m_sortObjMap.end())
		{
			auto iterObj = iter->second.find(idObj);
			if (iterObj != iter->second.end())
			{
				iter->second.erase(iterObj);
			}
		}
	}
}

//Add 2011-10-27 ɸѡ���
YK_BOOL SortConditionManager::CompareTableRelCodeResult(YK_CTYPERef tblType, YK_ID firstId, YK_ID secondId, YK_ID idObj /* = 0 */)
{
	if (idObj == 0)
	{
		map<YK_TYPE, SortConditionList >::iterator iter = m_sortConMap.find(tblType);
		if(iter != m_sortConMap.end())
		{
			return iter->second.CompareTableRelCodeResult(firstId,secondId);
		}
		
	}
	else
	{
		auto iter = m_sortObjMap.find(tblType);
		if (iter != m_sortObjMap.end())
		{
			auto iterObj = iter->second.find(idObj);
			if (iterObj != iter->second.end())
			{
				return iterObj->second.CompareTableRelCodeResult(firstId, secondId);
			}
		}
	}
	

	return false;
}

wstring SortConditionManager::GetSerializeStr()
{
	std::wostringstream ossOut(ostringstream::out);   //�Ѷ���д���ַ����������
	boost::archive::text_woarchive oa(ossOut);

	oa << *this;
	return ossOut.str();
}

void SortConditionManager::InitBySerializeStr(wstring& serializeStr)
{
	if (serializeStr.empty())
		return ;
	wistringstream ossIn(serializeStr);      //���ַ����������ж�������
	boost::archive::text_wiarchive ia(ossIn);
	ia >> *this;
}

YK_BOOL SortConditionManager::ModifyTblSortCondition( SortConditionList& sortCon, YK_CTYPERef tblType, YK_ID id /*= 0*/ )
{
	if (id == 0)
	{
		m_sortConMap[tblType] = sortCon;
	}
	else
	{
		m_sortObjMap[tblType][id] = sortCon;
	}
	return false;
}

}
