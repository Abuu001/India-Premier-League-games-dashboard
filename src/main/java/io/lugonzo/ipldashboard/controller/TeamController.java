package io.lugonzo.ipldashboard.controller;

import io.lugonzo.ipldashboard.entity.Team;
import io.lugonzo.ipldashboard.repository.TeamRepository;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@NoArgsConstructor
public class TeamController {

    @Autowired
    private TeamRepository teamRepository;

    @GetMapping("/team/{teamName}")
    public Team getTeam(@PathVariable String teamName) {
        Team team = teamRepository.findByTeamName(teamName);
        //  team.setMatches(matchRepository.findLatestMatchesbyTeam(teamName,4));

        return team;
    }
}
