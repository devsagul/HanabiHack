//ûjÆµÄÍc}[WãÌ}`ªiRe²ð¨, Im²ðªÉæÁ½Éj½vñèÌ¸_ñðÂæ¤É·éBgª¦éêÉàÎ·éB
//Ot\zÅª¢¢ðÅÓðÍéÆAÊÏär³µÅ½p`Ì}[Wª¬÷·éÌÅAÈñ©¤êµ¢B

#include "MargePoly.h"
#include "DxLib.h"


//dst_polyÌÓâ¸_Éí¹Äsrc_polyðÏ`·é -> »ÌãAsrc_polyÉí¹Ädst_polyðÏ`·é
void MargePoly::point_marge(Poly &src_poly, Poly &dst_poly) {
	int i, j;

	for (i = 0; i < src_poly.size(); i++) {
		Point &point = src_poly.points[i];
		
		//dst_polyÌ¸_Éß¯êÎA»¢ÂÌÀWÉ·é
		for (j = 0; j < dst_poly.size(); j++) {
			if (abs(point - dst_poly.points[j]) <= dist_error) {
				point = dst_poly.points[j];
				break;
			}
		}
		if (j < dst_poly.size()) { continue; }

		//dst_polyÌÓÉß¯êÎAsrc_poly.{points[i] -> points[i+1]}Ìð_, src_poly.{points[i-1] -> points[i]}ÆÌð_Ì¤¿Aß¢ûÌÀWÉ·é
		for (j = 0; j < dst_poly.size(); j++) {
			Line line = Line(dst_poly.points[j], dst_poly.points[j + 1]);
			if (line.dist(point) <= dist_error) {
				
				Line line1 = Line(src_poly.points[(i + src_poly.size() - 1) % src_poly.size()], src_poly.points[i]);
				Line line2 = Line(src_poly.points[i], src_poly.points[i + 1]);
				Point p1 = line.cross_point(line1);
				Point p2 = line.cross_point(line2);

				if (abs(p1 - point) < abs(p2 - point)) { point = p1; }
				else { point = p2; }
				break;
			}
		}
	}
	src_poly.points[src_poly.size()] = src_poly.points[0];

	for (i = 0; i < dst_poly.size(); i++) {
		Point &point = dst_poly.points[i];

		//src_polyÌ¸_Éß¯êÎA»¢ÂÌÀWÉ·é
		for (j = 0; j < src_poly.size(); j++) {
			if (abs(point - src_poly.points[j]) <= dist_error) {
				point = src_poly.points[j];
				break;
			}
		}
		if (j < src_poly.size()) { continue; }

		//src_polyÌÓÉß¯êÎAdst_poly.{points[i] -> points[i + 1]}Ìð_, dst_poly.{points[i - 1] -> points[i]}ÆÌð_ÌàAß¢Ù¤ÌÀWÉ·é
		for (j = 0; j < src_poly.size(); j++) {
			Line line = Line(src_poly.points[j], src_poly.points[j + 1]);
			if (line.dist(point) <= dist_error) {

				Line line1 = Line(dst_poly.points[(i + dst_poly.size() - 1) % dst_poly.size()], dst_poly.points[i]);
				Line line2 = Line(dst_poly.points[i], dst_poly.points[i + 1]);
				Point p1 = line.cross_point(line1);
				Point p2 = line.cross_point(line2);

				if (abs(p1 - point) < abs(p2 - point)) { point = p1; }
				else { point = p2; }
				break;
			}
		}
	}
	dst_poly.points[dst_poly.size()] = dst_poly.points[0];
}


//points, linesÌÝè (unique·é¾¯)
void MargePoly::make_group(Poly &src_poly, Poly &dst_poly) {
	int i, j;

	points.clear();
	for (i = 0; i < src_poly.size(); i++) {
		for (j = 0; j < points.size(); j++) { if (abs(points[j] - src_poly.points[i]) <= 1) break; }
		if (j == points.size()) { points.push_back(src_poly.points[i]); }
	}
	for (i = 0; i < dst_poly.size(); i++) {
		for (j = 0; j < points.size(); j++) { if (abs(points[j] - dst_poly.points[i]) <= 1) break; }
		if (j == points.size()) { points.push_back(dst_poly.points[i]); }
	}

	lines.clear();
	for (i = 0; i < src_poly.size(); i++) {
		Line line = Line(src_poly.points[i], src_poly.points[i + 1]);
		for (j = 0; j < lines.size(); j++) { if (lines[j] == line) break; }
		if (j == lines.size()) { lines.push_back(line); }
	}
	for (i = 0; i < dst_poly.size(); i++) {
		Line line = Line(dst_poly.points[i], dst_poly.points[i + 1]);
		for (j = 0; j < lines.size(); j++) { if (lines[j] == line) break; }
		if (j == lines.size()) { lines.push_back(line); }
	}
}


//Ós -> eÌ¶¤É}[WÌæª èAE¤É}[WãÌÌæª³¢ÌtrueðÔ·Bi½¾µRe²ð¨, Im²ðªÉæÁÄl¦éj
bool MargePoly::can_connect(Point s, Point e, Poly &src_poly, Poly &dst_poly, bool dst_is_piece) {
	Point mid = (s + e) * 0.5;
	double len[1] = {dist_error * 0.2};
	Point hosen = complex<double>(0, 1) * (e - s) / abs(e - s);

	bool is_left_in;	//¶¤É}[WÌæª éÌtrue, }[WÌæ := }[WãÌ½p`
	bool is_right_in;	//E¤É}[WÌæª éÌtrue

	for (int i = 0; i < 3; i++) {
		Point left = mid + hosen * len[i];
		Point right = mid - hosen * len[i];
		if (dst_is_piece) {
			is_left_in  = src_poly.is_cover_point(left) || dst_poly.is_cover_point(left);
			is_right_in = src_poly.is_cover_point(right) || dst_poly.is_cover_point(right);
		}
		else {
			is_left_in  = (!src_poly.is_cover_point(left) && dst_poly.is_cover_point(left));
			is_right_in = (!src_poly.is_cover_point(right) && dst_poly.is_cover_point(right));
		}
		if (is_left_in && !is_right_in) return true;
	}
	return false;
}


//tableÌ¶¬
void MargePoly::make_graph(Poly &src_poly, Poly &dst_poly, bool dst_is_piece) {
	int i, j, k;

	for (i = 0; i < points.size(); i++) for (j = 0; j < points.size(); j++) table[i][j] = false;

	for (i = 0; i < lines.size(); i++) {
		//_Xg¶¬
		vector<pair<Point, int> > p_list;
		for (j = 0; j < points.size(); j++) {	//O[vjÌã\_iã\_jj
			if (lines[i].dist(points[j]) <= dist_error * 0.1) {
				//ã\_jÍÓlines[i]ãÉæÁÄ¢éI
				p_list.push_back(pair<Point, int>(points[j], j));
			}
		}

		//\[g
		for (j = 0; j < (int)p_list.size() - 1; j++) {
			for (k = (int)p_list.size() - 1; k > j; k--) {
				double dist_l = norm(p_list[k - 1].first - lines[i].s);
				double dist_r = norm(p_list[k].first - lines[i].s);
				if (dist_l > dist_r) {
					swap(p_list[k - 1], p_list[k]);
				}
			}
		}

		//ÓÇÁ
		for (j = 0; j < (int)p_list.size() - 1; j++) {
			int u = p_list[j].second;
			int v = p_list[j+1].second;

			//points[u] -> points[v]Ì¶¤É}[WãÌÌæª èAE¤É}[WãÌÌæª³¢êAu->vðÂÈ®
			if (can_connect(points[u], points[v], src_poly, dst_poly, dst_is_piece)) {
				table[u][v] = true;
			}
			//points[v] -> points[u]Ì¶¤É}[WãÌÌæª èAE¤É}[WãÌÌæª³¢êAv->uðÂÈ®
			if (can_connect(points[v], points[u], src_poly, dst_poly, dst_is_piece)) {
				table[v][u] = true;
			}
		}
	}
}



//½vñèÌ½p`Ì¶¬i½¾µ, ±ÌiKÅÍç·ÈÓðÜÞ)
//}[WãÌ½p`ÉÜÜêé_ð1ÂIÔ(points[start_id]ðIñ¾)¨Ì_ÍS·(êÓ©à)¨3_ÚÈ~ÍæÃ~ÉÆé¨[vªÅ«éÜÅJèÔ·B
//¸_ñÌü«ª³µ¢©ð»è·éBOKÈç}[WI¹B(ÊÏärÍ¢çÈ­ÈÁ½j
vector<Point> MargePoly::get_cycle(int start_id) {
	vector<bool> visited;
	int i, j;
	
	visited.resize(points.size());

	for (i = 0; i < points.size(); i++) {
		if (!table[start_id][i]) continue;

		//_start_id -> iÆKêÄÝ½
		Point prev = points[start_id];
		Point now = points[i];
		int now_id = i;

		vector<Point> cycle;
		vector<int> cycle_point_id;
		for (j = 0; j < points.size(); j++) visited[j] = false;

		cycle.push_back(points[start_id]); cycle_point_id.push_back(start_id); visited[start_id] = true;
		cycle.push_back(points[i]); cycle_point_id.push_back(i);
			
		while (!visited[now_id]) {
			//tOð§Äé
			visited[now_id] = true;
			//Ìêðßé
			double tmp_ang = 114514;		//vñèÅà¤ðæéÈçmin», ½vñèÅOüðæéÈçmin» -> min»II
			int next_id = -1;
			for (j = 0; j < points.size(); j++) {
				if (!table[now_id][j] || points[j] == prev) continue;

				Point vec = (points[j] - now) / (prev - now);
				double ang = atan2(vec.imag(), vec.real());
				if (ang < 0) ang += 2 * 3.14159265358979;
				if (tmp_ang > ang) { tmp_ang = ang; next_id = j; }
			}
			if (next_id == -1) {
				printfDx("}[WG[FTCNª©Â©èÜ¹ñ\n");
				//if (abs(now - points[start_id]) < 2 * dist_error) {
				//	printfDx("­§IÉn_ÉÚ®µÜ·\n");
				//	next_id = start_id;
				//}
				//else {
					break;
				//}
			}
			//Ú®·é
			prev = now;
			now = points[next_id];
			now_id = next_id;
			cycle.push_back(now);
			cycle_point_id.push_back(now_id);
		}

		if (now_id != start_id) { continue; }	//n_ÉßêÈ©Á½ÌÅsÂ
		//ÊÏvZ
		Poly poly; poly.points = cycle;
		if (poly.area() < 0) continue;		//vñèÈÌÅNG
		
		//}[WÂ\II -> tableÌXVà·é
		for (j = 0; j < (int)cycle_point_id.size(); j++) {
			int u = cycle_point_id[j];
			int v = cycle_point_id[(j + 1) % cycle_point_id.size()];
			table[u][v] = false;
		}
		return cycle;
	}
	//}[WsÂi}[W·éÆóÌæÉÈÁÄµÜ¤j
	vector<Point> null_points;
	return null_points;
}


bool MargePoly::has_no_holl(vector<int> ids, Poly &poly) {
	sort(ids.begin(), ids.end());
	for (int i = 0; i < (int)ids.size(); i++) {	//ids[i]©çX^[g
		bool flag = true;
		for (int j = 0; j < (int)ids.size() - 1; j++) {	//ids[i+j]Æids[i+j+1]Ìär
			int u = (i + j) % ids.size();
			int v = (i + j + 1) % ids.size();
			u = (u < i) * poly.size() + ids[u];
			v = (v < i) * poly.size() + ids[v];
			if (v - u >= 2) {
				flag = false;
				break;
			}
		}
		if (flag) return true;
	}
	return false;
}

//TCN©çç·È_ð¢Ä½p`ðì¬
Poly MargePoly::to_poly(vector<Point> cycle, Poly &src_poly, Poly &dst_poly, double angle_error_deg, bool dst_is_piece) {
	//ç·È_ðæè­
	vector<Point> new_cycle;
	new_cycle.push_back(cycle[0]);
	for (int i = 0; i < (int)cycle.size() - 2; i++) {
		Point vec = (cycle[i + 1] - cycle[i]) / (cycle[i + 2] - cycle[i + 1]);
		vec /= abs(vec);
		if (abs(vec.imag()) > sin(angle_error_deg * 3.1415926 / 180.0)) {	//_i + 1ÅÈªÁÄ¢é
			new_cycle.push_back(cycle[i + 1]);
		}
	}
	new_cycle.push_back(new_cycle[0]);

	//}[Wµ½½p`ðÔ·
	vector<Line> lines;
	for (int i = 0; i < src_poly.lines.size(); i++) lines.push_back(src_poly.lines[i]);
	for (int i = 0; i < dst_poly.lines.size(); i++) lines.push_back(dst_poly.lines[i]);

	Poly ret = Poly(new_cycle, lines);
	if (!dst_is_piece) { ret.point_reverse(); }
	return ret;
}


//}[WÂ\ÈçtrueðÔµ, sÂ\ÈçfalseðÔ·
//dist_error, angle_error_degÍAmarge_polyÉn·lÅÍÈ­A]¿ÖevaluationÅp¢çêÄ¢élÉ·éB
bool MargePoly::can_marge(double dist_error, double angle_error_deg, Poly &src_poly, Poly &dst_poly, bool dst_is_piece, vector<Poly> &wakus) {
	int i, j;

	if (dst_is_piece == false) return true;

	//Ì¶Ý»è
	vector<int> ids, ids2;

	for (i = 0; i < src_poly.size(); i++) {
		for (j = 0; j < dst_poly.size(); j++) {
			Line line1 = Line(src_poly.points[i], src_poly.points[i + 1]);
			Line line2 = Line(dst_poly.points[j], dst_poly.points[j + 1]);
			
			Point rot = (line1.e - line1.s) / (line2.e - line2.s); rot /= abs(rot);
			if (abs(rot.imag()) > sin(2 * angle_error_deg * 3.1415926 / 180.0)) { continue; }
			if (line1.dist(line2.s) > dist_error && line1.dist(line2.e) > dist_error && line2.dist(line1.s) > dist_error && line2.dist(line1.e) > dist_error) { continue; }
			double score = line1.machi_score(line2, dist_error, angle_error_deg);
			if (score == 2) { continue; }

			//line1Æline2ªdÈÁÄ¢éê
			//printfDx("%d %d\n", i, j);
			ids.push_back(i);
			ids2.push_back(j);
			break;
		}
	}
	if (has_no_holl(ids, src_poly) && has_no_holl(ids2, dst_poly)) return true;
	return false;
}


//½p`Ì}[W
//dist_errorc é¸_i©ç£dist_errorÈºÉ é¸_ðO[v»·éÈÇcB]¿ÖÅp¢Ä¢édist_erroræèà1.5{­ç¢å«¢ûªæ¢B
//angle_errorcç·È_ðæè­ÛÉp¢éBå«·¬éÆ¸_ªµA¬³·¬éÆç·È_ªcéB]¿ÖÅp¢Ä¢éangle_error_degÆ¯¶­ç¢É·éÆ³ïB
pair<bool, vector<Poly>> MargePoly::marge_poly(double dist_error, double angle_error_deg, Poly &src_poly, Poly &dst_poly, bool dst_is_piece) {
	this->dist_error = dist_error * 2;
	
	point_marge(src_poly, dst_poly);
	make_group(src_poly, dst_poly);
	make_graph(src_poly, dst_poly, dst_is_piece); 
	
	double area = (dst_is_piece ? abs(src_poly.area()) + abs(dst_poly.area()) : abs(dst_poly.area()) - abs(src_poly.area()));
	vector<Point> cycle;

	vector<Poly> ret;
	int sid;
	for (sid = 0; sid < points.size(); sid++) {
		cycle = get_cycle(sid);
		if (cycle.size() <= 0) continue;
		
		//½p`ðìé
		ret.push_back(to_poly(cycle, src_poly, dst_poly, angle_error_deg, dst_is_piece));
	}
	if (ret.size() > 0) {
		return pair<bool, vector<Poly>>(true, ret);
	}

	//We cannot find any marged_polys
	if (!dst_is_piece && abs(area) <= 1000) {	//gðß½
			cycle.push_back(Point(-114514, -114514));	//_~[Ì_ðÇÁ
			ret.push_back(to_poly(cycle, src_poly, dst_poly, angle_error_deg, dst_is_piece));
			return pair<bool, vector<Poly>>(true, ret);
	}
	//×Úsñð\¦ifobOj
	printfDx("-------×Úsñ------------\n");
	for (int i = 0; i < points.size(); i++) {
		for (int j = 0; j < points.size(); j++) {
			if (table[i][j]) {
				printfDx("%d ", j);
			}
		}
		printfDx("\n");
	}
	printfDx("---------------------------\n");

	return pair<bool, vector<Poly>>(false, ret);
}
