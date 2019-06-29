bool compare(const string &s1,const string &s2)
{
	return (s1+s2)<(s2+s1);
}
class Solution {
public:
	string PrintMinNumber(vector<int> numbers) {

		vector<string> v;
		for (auto n:numbers)
		{
			stringstream ss;
			ss<<n;
			string s;
			ss>>s;
			v.push_back(s);
		}
		sort(v.begin(),v.end(),compare);
		string result;
		for (auto s:v)
		{
			result += s;
		}
		return result;
	}
};