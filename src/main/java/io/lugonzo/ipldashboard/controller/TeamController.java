package io.lugonzo.ipldashboard.controller;

import io.lugonzo.ipldashboard.entity.Match;
import io.lugonzo.ipldashboard.entity.Team;
import io.lugonzo.ipldashboard.repository.MatchRepository;
import io.lugonzo.ipldashboard.repository.TeamRepository;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@AllArgsConstructor
@NoArgsConstructor
@CrossOrigin
public class TeamController {

    @Autowired
    private TeamRepository teamRepository;

    @Autowired
    private MatchRepository matchRepository;

    @GetMapping("/team/{teamName}")
    public Team getTeam(@PathVariable String teamName) {
        Team team = teamRepository.findByTeamName(teamName);

        team.setMatches(matchRepository.findLatestMatchesByTeam(teamName,4));

        return team;
    }

    @GetMapping("/team")
    public Iterable<Team> getTeam(){
        return teamRepository.findAll();
    }

    @GetMapping("/team/{teamName}/matches")
    public List<Match> getMatchesForTeams(@PathVariable String teamName, @RequestParam int year){
        LocalDate startDate =LocalDate.of(year,1,1);
        LocalDate endDate =LocalDate.of(year + 1,1,1);

        return matchRepository.getMatchesByTeamBetweenDates(teamName,startDate,endDate);
    }
}
