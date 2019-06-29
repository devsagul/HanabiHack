#pragma hdrstop
#pragma package(smart_init)
#include "TableHandler.h"

TableHandler::TableHandler()
{
	this->size = 0;
	this->setted = 0;
	this->focused_row = 1;
	this->focused_col = 0;
	this->last_finded = 0;
	this->SavingPlace = "";
	this->IsEditOppenned = false;
}

int		TableHandler::AddNewRow()
{
	setted++;
	if (setted == size)
	{
		MainTableWidget->RiversDB->RowCount++;
		size++;
	}
	return (setted);
}

void	TableHandler::SwapRows(int r1, int r2)
{
	US buff;
	for (int i = 0; i < 5; i++)
	{
		buff = MainTableWidget->RiversDB->Rows[r1]->Strings[i];
		MainTableWidget->RiversDB->Rows[r1]->Strings[i] = MainTableWidget->RiversDB->Rows[r2]->Strings[i];
		MainTableWidget->RiversDB->Rows[r2]->Strings[i] = buff;
	}
}

bool	TableHandler::IsColNumeric(int col)
{
	for (int i = 1; i < this->setted + 1; i++)
	{
		if (!this->IsFieldNumeric(MainTableWidget->RiversDB->Rows[i]->Strings[col]))
			return (false);
	}
	return (true);
}

void	TableHandler::NumSortCol(int col)
{
	for (int i = 2; i < this->setted + 1; i++)
		for (int j = i; j > 1
			&& MainTableWidget->RiversDB->Rows[j - 1]->Strings[col].ToInt()
			>  MainTableWidget->RiversDB->Rows[j]->Strings[col].ToInt(); j--)
			this->SwapRows(j - 1, j);
}

void	TableHandler::SortCol(int col)
{
	if (this->setted < 2)
		return ;
	if (this->IsColNumeric(col))
		return this->NumSortCol(col);

	for (int i = 2; i < this->setted + 1; i++)
		for (int j = i; j > 1
			&& MainTableWidget->RiversDB->Rows[j - 1]->Strings[col]
			>  MainTableWidget->RiversDB->Rows[j]->Strings[col]; j--)
			this->SwapRows(j - 1, j);
}

void	TableHandler::Find(int col, US pattern)
{
	std::set<US> mayBe;

	for (int i = 1; i < this->setted + 1; i++)
	{
		if (MainTableWidget->RiversDB->Rows[i]->Strings[col] == pattern)
		{
			MainTableWidget->RiversDB->Row = i;
			this->last_finded = i;
			return ;
		}
		else if (MainTableWidget->RiversDB->Rows[i]->Strings[col].Pos0(pattern) != -1)
			mayBe.insert(MainTableWidget->RiversDB->Rows[i]->Strings[col]);
	}
	alert("Не удалось найти соответствий :(" + this->MakeSuggeetionStr(mayBe));
	this->last_finded = 1;
}

void	TableHandler::FindNext(int col, US pattern)
{
	std::set<US> mayBe;

	for (int i = this->last_finded + 1; i < this->setted + 1; i++)
	{
		if (MainTableWidget->RiversDB->Rows[i]->Strings[col] == pattern)
		{
			MainTableWidget->RiversDB->Row = i;
			this->last_finded = i;
			return ;
		}
		else if (MainTableWidget->RiversDB->Rows[i]->Strings[col].Pos0(pattern) != -1)
			mayBe.insert(MainTableWidget->RiversDB->Rows[i]->Strings[col]);
	}
	alert("Не удалось найти соответствий :(" + this->MakeSuggeetionStr(mayBe));
	this->last_finded = 1;
}

void	TableHandler::Save()
{
	if (this->SavingPlace.IsEmpty())
	{
		MainTableWidget->SaveTableDialog->Execute();
		if (!MainTableWidget->SaveTableDialog->FileName.IsEmpty())
			this->SaveTo(MainTableWidget->SaveTableDialog->FileName);
	}
	else
		this->SaveTo(this->SavingPlace);
}

void	TableHandler::SaveTo(US place)
{
	TStringList	  *List = new TStringList;

	for (int i = 0; i < MainTableWidget->RiversDB->RowCount; i++)
	{
		for (int j = 0; j < MainTableWidget->RiversDB->ColCount; j++)
		{
			List->Add(MainTableWidget->RiversDB->Cells[j][i]);
		}
	}
	List->SaveToFile(place);
	this->SavingPlace = place;
	delete List;
}

void	TableHandler::Open(US place)
{
	TStringList	 *List = new TStringList;

	List->LoadFromFile(place);
	while (Table.setted + 1 >  List->Count / MainTableWidget->RiversDB->ColCount)
	{
		MainTableWidget->RiversDB->Rows[Table.setted]->Clear();
		Table.setted--;
	}
	Table.setted = List->Count / MainTableWidget->RiversDB->ColCount;
	if (Table.setted > MainTableWidget->RiversDB->RowCount)
	{
		MainTableWidget->RiversDB->RowCount = Table.setted;
		Table.size = Table.setted;
	}
	for (int i = 0; i < Table.setted; i++)
	{
		for (int j = 0; j < MainTableWidget->RiversDB->ColCount; j++)
		{
			MainTableWidget->RiversDB->Cells[j][i] = List->Strings[i * MainTableWidget->RiversDB->ColCount + j];
		}
	}
	Table.setted--;
	delete List;
	this->ValidateTable();
}

bool	TableHandler::IsFieldNumeric(US field)
{
	for (int i = 0; i < field.Length(); i++)
		if (!std::isdigit(field.c_str()[i]) && !std::isspace(field.c_str()[i]))
			return (false);
	return (true);
}

US TableHandler::MakeSuggeetionStr(std::set<US> maybe)
{
	US	message = "\nВозможно вы имели ввиду:\n";
	int counter = 0;

	if (maybe.empty())
		return ("");
	for (std::set<US>::iterator i = maybe.begin(); i != maybe.end() && counter < 5; i++)
	{
		message += *i + "\n";
		counter++;
	}
	return (message);
}

US	TableHandler::FormatingNumericField(US field)
{
	field = this->RemoveSpacesFromField(field);
	while (field.c_str()[0] == '0' && field.Length() > 1)
		field = field.Delete0(0, 1);
	return (field);
}


void TableHandler::ValidateTable()
{
	bool	FirstEdit = true;

	if (this->IsColNumeric(2) && this->IsColNumeric(3))
		return ;
	alert("В открытом файле обнаружены ошибки.\nПожалуйста, исправьте их для продолжения корректной работы.");
	for (int i = 1; i < this->setted + 1; i++)
	{
		if (!this->IsFieldNumeric(MainTableWidget->RiversDB->Rows[i]->Strings[2])
		|| !this->IsFieldNumeric(MainTableWidget->RiversDB->Rows[i]->Strings[3]))
		{
			if (FirstEdit)
			{
				EditWidget->Show();
				EditWidget->Name->Text = MainTableWidget->RiversDB->Rows[i]->Strings[0];
				EditWidget->Continent->Text = MainTableWidget->RiversDB->Rows[i]->Strings[1];
				EditWidget->From->Text = MainTableWidget->RiversDB->Rows[i]->Strings[4];
				EditWidget->Square->Text = MainTableWidget->RiversDB->Rows[i]->Strings[3];
				EditWidget->Lenght->Text = MainTableWidget->RiversDB->Rows[i]->Strings[2];
				EditWidget->Setted = i;
				Table.IsEditOppenned = true;
				FirstEdit = false;
			}
			else
				EditWidget->ToEdit.push_back(i);
		}
	}
}

US	 TableHandler::RemoveSpacesFromField(US field)
{
	for (int i = field.Length(); i >= 0; i--)
		if (std::isspace(field.c_str()[i]))
			field = field.Delete0(i, 1);
	return (field);
}

TableHandler Table;