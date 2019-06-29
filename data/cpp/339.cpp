#include <iostream>
#include <cstdlib>
#include <ctime>
#include <string>
#define N 10
#define SLEEPTIME 3000
using namespace std;


void my_bubblesort(char *arr, int len);



class player
{
public:
	char hand[N];
	char exist_card[N];
	char bolted_card[N];
	int score;
	int score_ini;
	char recent_card;

	player(string name_input)
	{
		score = 0;
		name = name_input;
		recent_card = '1';

		for (int i = 0; i < N; i++)
		{
			hand[i] = '0';
		}
		for (int i = 0; i < N; i++)
		{
			exist_card[i] = '0';
		}
		for (int i = 0; i < N; i++)
		{
			bolted_card[i] = '0';
		}

		//initialize hand
		first_card = hand[0] = rand() % 6 + '2';
		score += first_card - '0';
		score_ini = score;
		for (int i = 1; i < N; i++)
		{
			hand[i] = rand() % 9 + '1';
		}
		my_bubblesort(hand, N);

		//convert 8 9 into m b
		for (int i = 0; i < N; i++)
		{
			if (hand[i] == '8')
			{
				hand[i] = 'm';
			}
			else if (hand[i] == '9')
			{
				hand[i] = 'b';
			}
		}

		for (int i = 0; i < N; i++)
		{
			exist_card[i] = '0';
		}


	}
	player()
	{
		string name_input = "xxx";
		score = 0;
		name = name_input;
		recent_card = '0';

		for (int i = 0; i < N; i++)
		{
			hand[i] = '0';
		}
		for (int i = 0; i < N; i++)
		{
			exist_card[i] = '0';
		}
		for (int i = 0; i < N; i++)
		{
			bolted_card[i] = '0';
		}

		//initialize hand
		first_card = hand[0] = rand() % 6 + '2';
		score += first_card - '0';
		for (int i = 1; i < N; i++)
		{
			hand[i] = rand() % 9 + '1';
		}
		my_bubblesort(hand, N);

		//convert 8 9 into m b
		for (int i = 0; i < N; i++)
		{
			if (hand[i] == '8')
			{
				hand[i] = 'm';
			}
			else if (hand[i] == '9')
			{
				hand[i] = 'b';
			}
		}

		for (int i = 0; i < N; i++)
		{
			exist_card[i] = '0';
		}


	}

	int bolt(char input);
	int clean_bolt();
	string name;
	char first_card = '0';
	void show(int arg);
	int play_card(char card);
};



//arg=1 ÉÏµÛÊÓ½Ç   arg=2 ¶ÔÊÖÊÓ½Ç
void player::show(int arg)
{
	cout << name << ": ";
	if (arg == 1)
	{
		for (int i = 0; i < N; i++)
		{
			if (hand[i] != '0')
			{
				cout << hand[i];
			}
		}
		cout << "/";
		for (int i = 0; i < N; i++)
		{
			if ((exist_card[i] != '0') && (exist_card[i] != 'b') && (exist_card[i] != 'm'))
			{
				cout << exist_card[i];
			}
		}
		cout << "/" << endl;
	}
	else
	{
		for (int i = 0; i < N; i++)
		{
			if (hand[i] != '0')
			{
				cout << "X";
			}
		}
		cout << "/";
		for (int i = 0; i < N; i++)
		{
			if ((exist_card[i] != '0') && (exist_card[i] != 'b') && (exist_card[i] != 'm'))
			{
				cout << exist_card[i];
			}
		}
		cout << "/" << endl;
	}
}


int player::play_card(char card_input)
{
	int found = 0;
	int i_hand = 0;
	for (i_hand = 0; i_hand < N; i_hand++)
	{
		if (hand[i_hand] == card_input)
		{
			found = 1;
			break;
		}
	}

	if (found == 0)
	{
		cout << "error: no such card\n";
		return 0;// 0 means failed
	}

	if (found == 1)
	{
		int i_ec = 0;// index of existed card
		while (exist_card[i_ec] != '0')
		{
			i_ec++;
		}
		exist_card[i_ec] = card_input;
		hand[i_hand] = '0';
	}

	return 1;// 1 means succeed
}

int player::bolt(char card_input)
{
	int found = 0;
	int i_hand = 0;
	for (i_hand = 0; i_hand < N; i_hand++)
	{
		if (exist_card[i_hand] == card_input)
		{
			found = 1;
			break;
		}
	}

	if (found == 0)
	{
		cout << "error: no such exist card\n";
		return 0;// 0 means failed
	}

	if (found == 1)
	{
		int i_ec = 0;// index of existed card
		while (bolted_card[i_ec] != '0')
		{
			i_ec++;
		}
		bolted_card[i_ec] = card_input;
		exist_card[i_hand] = '0';
		score -= card_input - '0';
	}

	return 1;// 1 means succeed
}

int player::clean_bolt()
{
	for (int i = 0; i < N; i++)
	{
		if (bolted_card[i] != '0')
		{
			int i_ec = 0;// index of existed card
			while (exist_card[i_ec] != '0')
			{
				i_ec++;
			}
			exist_card[i_ec] = bolted_card[i];
			score += bolted_card[i] - '0';
			bolted_card[i] = '0';

		}
	}
	return 0;
}


int judge(player *p_this, player* p_prev);

int main()
{
	srand(time(NULL));
	string name1 = "John";
	string name2 = "Tom";
	player John(name1), Tom(name2);



	cout << "Welcome to BLADE!" << '\n';
	cout << "There are two players\nIf you have no cards to use, you can type 0 to pass\nIf the opponent then also type 0\n"
		<< "then the game ends \nand the player who has the higher current score wins\n\n";
	John.show(2);//John
	Tom.show(2);//Tom

	cout << "John gets " << John.first_card << endl;
	cout << "Tom  gets " << Tom.first_card << endl;

	player p1(name1), p2(name1);

	//determine who goes first
	if (John.first_card >= Tom.first_card)
	{
		p1 = John;
		p2 = Tom;
	}
	else
	{
		p1 = Tom;
		p2 = John;
	}
	cout << p1.name << " goes first\n\n\n\n";

	_sleep(SLEEPTIME);

	int Round = 1;
	//=============================================
	while (1)
	{
		int ju_return;
		cout << "" << "Round " << Round << "   " << p1.name << " " << p1.score << "   " << p2.name << " " << p2.score << endl;
		p1.show(1);
		p2.show(2);

		if (Round > 1 && (p2.recent_card == '0'))
		{
			cout << "\nLast time the opponent passed\n";
		}

		cout << p1.name << " plays: ";
		ju_return = judge(&p1, &p2);
		if ((p2.recent_card == '0') && (p1.recent_card == '0'))
		{
			break;
		}
		Round++;
		system("cls");
		_sleep(SLEEPTIME);


		cout << "" << "Round " << Round << "   " << p1.name << " " << p1.score << "   " << p2.name << " " << p2.score << endl;
		p1.show(2);
		p2.show(1);

		if (Round > 1 && (p1.recent_card == '0'))
		{
			cout << "\nLast time the opponent passed\n";
		}

		cout << p2.name << " plays: ";
		ju_return = judge(&p2, &p1);
		if ((p2.recent_card == '0') && (p1.recent_card == '0'))
		{
			break;
		}

		Round++;
		system("cls");
		_sleep(SLEEPTIME);

	}//while (1)




	cout << "\nGames over\n";
	cout << p1.name << ": " << p1.score << endl;
	cout << p2.name << ": " << p2.score << endl;
	if (p1.score < p2.score)
	{
		player temp(name1);
		temp = p1;
		p1 = p2;
		p2 = temp;
	}

	cout << p1.name << " wins\n";

	cin.get();
	cin.get();

}



void my_bubblesort(char *arr, int len)
{
	for (int i = 0; i < len; i++)
	{
		for (int j = 0; j < len - i - 1; j++)
		{
			if (*(arr + j) > *(arr + j + 1))
			{
				char temp;
				temp = *(arr + j);
				*(arr + j) = *(arr + j + 1);
				*(arr + j + 1) = temp;
			}
		}
	}
}


int judge(player *p_this, player* p_prev)
{

	char card_input;
	while (1)
	{

		cin >> card_input;
		int flag = -1;

		if (!((card_input == 'm') || (card_input == '0') || (card_input == 'b') || ((card_input >= '1') && (card_input <= '7'))))
		{
			cout << "invalid input\n";
			continue;
		}


		switch (card_input)
		{
		case '2':case '3':case '4':case '5':case '6':case '7':
		{
			int temp_score;
			temp_score = p_this->score + card_input - '0';
			if (temp_score < p_prev->score)
			{
				flag = 1;//ÖØÀ´				
				break;
			}

			if (p_this->play_card(card_input) != 0)
			{
				flag = 0;//success
				p_this->score += card_input - '0';
				break;
			}
			else
				flag = 2;

			break;
		}
		case 'b':
		{
			if (p_prev->score_ini > p_this->score)
			{
				flag = 5;
				break;
			}

				p_prev->bolt(p_prev->recent_card);
			p_this->play_card(card_input);
			flag = 0;
			break;
		}
		case '1':
		{
			if (p_this->bolted_card[0] != '0')
			{
				p_this->clean_bolt();
				flag = 0;
				break;
			}
			else
			{
				int temp_score;
				temp_score = p_this->score + card_input - '0';
				if (temp_score < p_prev->score)
				{
					flag = 1;//ÖØÀ´				
					break;
				}


				if (p_this->play_card(card_input) != 0)
				{
					flag = 0;//success
					p_this->score += card_input - '0';
					break;
				}
				else
					flag = 2;

				break;

			}
		}
		case 'm':
		{
			if (p_this->score > p_prev->score)
			{
				flag = 1;
				break;
			}

			int temp;
			temp = p_this->score;
			p_this->score = p_prev->score;
			p_prev->score = temp;
			p_this->play_card(card_input);
			flag = 0;
			break;
		}

		case '0': {

			flag = 0;
			p_this->recent_card = '0';
			break;


		}
		}// switch


		if (flag == 0)//success
		{
			break;
		}
		if (flag == 1)
		{
			cout << "\nopponent's score:" << p_prev->score << endl;
			cout << "not big enough\n";
			continue;
		}
		if (flag == 5)
		{
			cout << "\nopponent's bolted score:" << p_prev->score_ini << endl;
			cout << "not big enough\n";
			continue;
		}
		if (flag == 2)
		{
			continue;
		}


	}//while (1)
	if ((card_input != 'm') && (card_input != 'b'))
		p_this->recent_card = card_input;
	return 1;
}