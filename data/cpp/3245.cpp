/************************************************************************************************/
/** 
 * @file		KsUpdateList.cpp
 * @brief		`æ
 * @author		A567W
 * @date		2011/10/17
 * @since		2011/10/17
 * @version		1.0.0
 */
/************************************************************************************************/

/*==============================================================================================*/
/*                                 << CN[h >>                                            */
/*==============================================================================================*/
#include "KsUpdateList.h"

/*==============================================================================================*/
/*                                     << è` >>                                               */
/*==============================================================================================*/

/*==============================================================================================*/
/*                                     << é¾ >>                                               */
/*==============================================================================================*/
ksNS_KS_BEGIN

/************************************************************************************************/
/*
 * RXgN^
 */
/************************************************************************************************/
KsUpdateList::KsUpdateList()
	: m_isActive( 0 )
	, m_pUpdateRoot( 0 )
	, m_pUpdateLast( 0 )
	, m_pUpdateThread( 0 )
{
}

/************************************************************************************************/
/*
 * fXgN^
 */
/************************************************************************************************/
KsUpdateList::~KsUpdateList()
{
}

/************************************************************************************************/
/*
 * `æ^XNðÇÁ·é
 * @param		pUpdate				`æ^XN
 */
/************************************************************************************************/
void KsUpdateList::add( KsUpdate* pUpdate )
{
	if( NULL == m_pUpdateRoot && NULL == m_pUpdateLast )
	{
		m_pUpdateRoot = pUpdate;
		m_pUpdateLast = pUpdate;
	}
	else
	{
		if( m_pUpdateRoot->getUpdatePriority() == m_pUpdateLast->getUpdatePriority() )
		{
			// `ævCIeBªêÈÌÅXgÉÇÁ·é
			m_pUpdateLast->m_pUpdateNext = pUpdate;

			pUpdate->m_pUpdatePrev = m_pUpdateLast;
			pUpdate->m_pUpdateNext = NULL;

			m_pUpdateLast = pUpdate;
		}
		else
		{
			KsUpdate* pTemp = m_pUpdateLast;

			while( pTemp )
			{
				if( pTemp->getUpdatePriority() <= pUpdate->getUpdatePriority() )
				{
					break;
				}
				pTemp = pTemp->m_pUpdatePrev;
			}

			if( pTemp )
			{
				// XgÉÇÁ·é
				if( pTemp == m_pUpdateLast )
				{
					m_pUpdateLast->m_pUpdateNext = pUpdate;

					pUpdate->m_pUpdatePrev = m_pUpdateLast;
					pUpdate->m_pUpdateNext = NULL;

					m_pUpdateLast = pUpdate;
				}
				else
				{
					// rÉÇÁ·é
					pUpdate->m_pUpdatePrev = pTemp;
					pUpdate->m_pUpdateNext = pTemp->m_pUpdateNext;
					pTemp->m_pUpdateNext = pUpdate;
				}

			}
			else
			{
				// æªÉÇÁ·é
				m_pUpdateRoot->m_pUpdatePrev = pUpdate;

				pUpdate->m_pUpdatePrev = NULL;
				pUpdate->m_pUpdateNext = m_pUpdateRoot;

				m_pUpdateRoot = pUpdate;

			}
		}
	}
}

/************************************************************************************************/
/*
 * `æ^XNðæè­
 * @param		pUpdate				`æ^XN
 */
/************************************************************************************************/
void KsUpdateList::remove( KsUpdate* pUpdate )
{
}

/************************************************************************************************/
/*
 * `æ^XNðæè­
 * @param		pUpdate				`æ^XN
 */
/************************************************************************************************/
void KsUpdateList::update( void* pParam )
{
	KsUpdate* pUpdate = m_pUpdateLast;

	while( pUpdate )
	{
		pUpdate->update( pParam );

		pUpdate = pUpdate->m_pUpdatePrev;
	}
}
	
ksNS_KS_END

